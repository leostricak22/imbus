import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, Button, Pressable} from 'react-native';
import userSessionData from '@/src/services/user/userSessionData';
import ChatHeader from '@/src/components/Chat/ChatHeader';
import getMessages from '@/src/services/chat/getMessages';
import axios from "axios";
import ChatProps from "@/src/types/chat/ChatProps";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import envVars from "@/src/utils/envVars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ChatInput} from "@/src/components/Chat/ChatInput";
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";
import {SvgXml} from "react-native-svg";
import schedule from "@/assets/icons/chat/schedule";
import check from "@/assets/icons/chat/check";
import close from "@/assets/icons/chat/close";
import useSendMessageSuggestion from "@/src/services/chat/useSendMessageSuggestion";
import Message from '../interface/Message';

const Chat: React.FC<NavigationParameter> = ({navigation, route}) => {
    const {userData} = userSessionData();
    const [message, setMessage] = useState('');
    const [calendarTrigger, setCalendarTrigger] = useState(false);
    const [userMessages, setUserMessages] = useState<any[]>([]);
    const {messages, setMessages, dataLoading, refetchMessages} = getMessages();

    const chatUser = route.params.username;
    const scrollViewRef = useRef(null);
    const [hoverStates, setHoverStates] = useState({
        accept: false,
        reject: false,
        suggestion: false,
    });

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({...prevState, [key]: value}));
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await refetchMessages();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!messages || messages.length === 0)
            return;

        setUserMessages(messages.filter((msg: {
            senderName: any;
            receiverName: any;
        }) => msg.senderName === chatUser || msg.receiverName === chatUser).reverse());
    }, [messages]);

    useEffect(() => {
        if (scrollViewRef.current) {
            // @ts-ignore
            scrollViewRef.current.scrollToEnd({animated: true});
        }
    }, []);

    async function setAsOpened() {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`${envVars.API_ENDPOINT}/chat/setopened`, chatUser, {
                headers: {Authorization: `Bearer ${token}`}
            });
        } catch (error) {
            console.error('Error sending message', error);
        }
    }

    setAsOpened();

    async function sendMessage(message: { senderName: string; receiverName: any; message: string; status: string; }) {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`${envVars.API_ENDPOINT}/chat/send`, message, {
                headers: {Authorization: `Bearer ${token}`}
            });
        } catch (error) {
            console.error('Error sending message', error);
        }
    }

    const handleMessageSend = async () => {
        const newMessage = {
            senderName: userData.username,
            receiverName: chatUser,
            message: message,
            status: 'MESSAGE'
        };
        await sendMessage(newMessage);
        setMessage('');
    };


    const handleSuggestionAction = async (msg: Message, action: string) => {
        msg.suggestionStatus = action;

        console.log(msg)

        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`${envVars.API_ENDPOINT}/chat/suggestion`, msg, {
                headers: {Authorization: `Bearer ${token}`}
            });
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <View style={styles.container}>
            <ChatHeader navigation={navigation} userData={userData} otherUser={chatUser} />
            <ScrollView
                style={styles.messagesContainer}
                ref={scrollViewRef}
                // @ts-ignore
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                <View>
                    {userMessages.map((msg, index) => (
                        msg.message != null && (
                            !msg.suggestion ? (
                                <View
                                    key={index}
                                    style={[
                                        msg.senderName === userData.username ? styles.sessionUserMessage : styles.otherUserMessage,
                                        userData.role === 'EXPERT' && msg.senderName === userData.username && { backgroundColor: "#ffeed0" }
                                    ]}
                                >
                                    <Text style={{ textAlign: msg.senderName === userData.username ? 'right' : 'left' }}>
                                        {msg.message}
                                    </Text>
                                </View>
                            ) : (
                                msg.senderName === userData.username || msg.suggestionStatus == 'REJECT' || msg.suggestionStatus == 'ACCEPT' ? (
                                    <View key={index} style={[styles.suggestionContainer, msg.suggestionStatus == 'WAITING' ? styles.borderYellow : msg.suggestionStatus == 'REJECT' ? styles.borderRed : styles.borderGreen]}>
                                        <Text style={styles.suggestionHeader}>Predložen datum:</Text>
                                        <Text style={styles.suggestionDateTime}>
                                            {(() => {
                                                const date = new Date(msg.message);
                                                const day = String(date.getDate()).padStart(2, '0');
                                                const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
                                                const year = date.getFullYear();
                                                return `${day}.${month}.${year}`;
                                            })()}
                                            .</Text>
                                        <Text style={styles.suggestionDateTime}>{new Date(msg.message).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
                                        <View style={styles.suggetsionIcon}>
                                            <SvgXml
                                                width="100%"
                                                height="100%"
                                                xml={
                                                    msg.suggestionStatus == 'WAITING' ? schedule :
                                                    msg.suggestionStatus == 'REJECT' ? close :
                                                    check
                                                } />
                                        </View>
                                    </View>
                                ) : (
                                    <View key={index} style={[styles.suggestionContainer, userData.role === 'EXPERT' && styles.borderOrange]}>
                                        <Text style={styles.suggestionHeader}>Predložen datum:</Text>
                                        <Text style={styles.suggestionDateTime}>{new Date(msg.message).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}.</Text>
                                        <Text style={styles.suggestionDateTime}>{new Date(msg.message).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>

                                        <Pressable
                                            style={[
                                                button.buttonContainer,
                                                hoverStates.accept ? (userData.role == 'CLIENT' ? colors.backgroundDarkBlue : colors.backgroundDarkOrange) : (userData.role == 'CLIENT' ? colors.backgroundBlue : colors.backgroundOrange)
                                            ]}
                                            onPress={() => handleSuggestionAction(msg, "ACCEPT")}
                                            onPressIn={() => setHoverState("accept", true)}
                                            onPressOut={() => setHoverState("accept", false)}
                                        >
                                            <Text style={[button.buttonText, colors.white]}>Potvrdi datum</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[
                                                button.buttonContainer,
                                                hoverStates.reject ? colors.backgroundDarkRed : colors.backgroundRed
                                            ]}
                                            onPressIn={() => setHoverState("reject", true)}
                                            onPressOut={() => setHoverState("reject", false)}
                                            onPress={() => handleSuggestionAction(msg, "REJECT")}
                                        >
                                            <Text style={[button.buttonText, colors.white]}>Odbij datum</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[
                                                button.buttonContainer,
                                                colors.backgroundWhite,
                                                styles.borderBlack,
                                                hoverStates.suggestion && colors.backgroundLightGray
                                            ]}
                                            onPress={() => setCalendarTrigger(true)}
                                            onPressIn={() => setHoverState("suggestion", true)}
                                            onPressOut={() => setHoverState("suggestion", false)}
                                        >
                                            <Text style={[button.buttonText, colors.black]}>Predloži drugi datum</Text>
                                        </Pressable>
                                    </View>
                                )
                            )
                        )
                    ))}
                </View>
            </ScrollView>
            <ChatInput message={message} setMessage={setMessage} role={userData.role} submit={handleMessageSend} otherUser={chatUser} calendarTrigger={calendarTrigger} setCalendarTrigger={setCalendarTrigger} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    chatHeader: {
        flex: 1,
        width: '100%',
        height: 70,
    },
    messagesContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        marginBottom: 70,
    },
    sessionUserMessage: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#dbf0ff',
        borderWidth: 1,
        borderColor: 'lightgray',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 6,
    },
    otherUserMessage: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 10,
    },
    suggestionContainer: {
        width: "90%",
        padding: 15,
        marginVertical: 15,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0478ca',

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10

    },
    borderBlack: {
        borderColor: 'black',
        borderWidth: 1,
    },
    suggestionHeader: {
        fontSize: 18,
        marginBottom: 10,
    },
    suggestionDateTime: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    borderYellow: {
        borderColor: '#e4e837',
    },
    borderRed: {
        borderColor: '#ff0d0d',
    },
    borderGreen: {
        borderColor: '#00ff29',
    },
    borderOrange: {
        borderColor: '#ff9a00',
    },
    suggetsionIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default Chat;
