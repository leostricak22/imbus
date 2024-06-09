import React, {useEffect, useRef, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import userSessionData from '@/src/services/userSessionData';
import ChatHeader from '@/src/components/Chat/ChatHeader';
import getMessages from '@/src/services/getMessages';
import axios from "axios";
import ChatProps from "@/src/types/ChatProps";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import envVars from "@/src/utils/envVars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ChatInput} from "@/src/components/Chat/ChatInput";

const Chat: React.FC<NavigationParameter> = ({ navigation, route }) => {
    const { userData } = userSessionData();
    const [message, setMessage] = useState('');
    const [userMessages, setUserMessages] = useState<any[]>([]);
    const { messages, setMessages, dataLoading, refetchMessages } = getMessages();

    const chatUser = route.params.username;
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await refetchMessages();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if(!messages || messages.length === 0)
            return;

        setUserMessages(messages.filter((msg: { senderName: any; receiverName: any; }) => msg.senderName === chatUser || msg.receiverName === chatUser).reverse());
    }, [messages]);

    useEffect(() => {
        if (scrollViewRef.current) {
            // @ts-ignore
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, []);

    async function sendMessage(message: { senderName: string; receiverName: any; message: string; status: string; }) {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`${envVars.API_ENDPOINT}/chat/send`, message, {
                headers: { Authorization: `Bearer ${token}` }
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

    return (
        <View style={styles.container}>
            <ChatHeader navigation={navigation} userData={userData} />
            <ScrollView
                style={styles.messagesContainer}
                ref={scrollViewRef}
                // @ts-ignore
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                <View>
                    {userMessages.map((msg, index) => (
                        <View key={index} style={msg.senderName === userData.username ? styles.sessionUserMessage : styles.otherUserMessage}>
                            <Text style={{ textAlign: msg.senderName === userData.username ? 'right' : 'left' }}>{msg.message}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <ChatInput message={message} setMessage={setMessage} role={userData.role} submit={handleMessageSend} />
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
});

export default Chat;
