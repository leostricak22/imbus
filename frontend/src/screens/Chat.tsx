import React, {useState} from "react";
import ChatUserProps from "@/src/types/ChatUserProps";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import {View, Text, StyleSheet, ScrollView, TextInput, Pressable} from "react-native";
import userSessionData from "@/src/services/userSessionData";
import ChatHeader from "@/src/components/Chat/ChatHeader";
import {input} from "@/src/styles/input";
import {SvgXml} from "react-native-svg";
import arrow_back_client from "@/assets/icons/chat/arrow_back_client";
import calendar from "@/assets/icons/navigation/calendar";
import send from "@/assets/icons/chat/send";
import {colors} from "@/src/styles/colors";

export const Chat: React.FC<NavigationParameter> = ({navigation, route  }) => {
    const {userData, setUserData, dataLoading, refetchUserData } = userSessionData();
    const [message, setMessage] = useState("");
    const [hoverStates, setHoverStates] = useState({
        send: false,
    });

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    return (
        <View style={styles.container}>
            <ChatHeader navigation={navigation} userData={userData} />
            <ScrollView style={styles.messagesContainer}>
                <View>
                    <Text>Chat</Text>
                </View>
            </ScrollView>
            <View style={styles.sendContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Napiši poruku..."
                        onChangeText={(text) => setMessage(text)}
                    />
                    <View style={styles.iconContainer}>
                        <Pressable style={styles.icon}>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={calendar}
                            />
                        </Pressable>
                    </View>
                </View>
                <Pressable style={[styles.send, userData.role == 'CLIENT' ? (hoverStates.send ? colors.backgroundDarkBlue : colors.backgroundBlue) : (hoverStates.send ? colors.backgroundDarkOrange : colors.backgroundOrange)]}
                           onPressIn={() => setHoverState("send", true)}
                           onPressOut={() => setHoverState("send", false)}
                >
                    <SvgXml
                        width="75%"
                        height="75%"
                        xml={send}
                    />
                </Pressable>
            </View>
        </View>
    );
}

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
    },
    sendContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row',
    },
    inputContainer: {
        backgroundColor: 'white',
        height: 50,
        width: '75%',
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        flexDirection: 'row',
    },
    input: {
        height: 50,
        width: '82%',
        paddingLeft: 20,
    },
    icon: {
        height: 20,
        width: 20,
    },
    iconContainer: {
        height: 50,
        width: '18%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    send: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 50,
    },
});

export default Chat;