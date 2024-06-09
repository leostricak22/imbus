import React, {useEffect, useState} from "react";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import ChatProps from "@/src/types/ChatProps";
import userSessionData from "@/src/services/userSessionData";
import getMessages from "@/src/services/getMessages";
import {useFocusEffect} from "@react-navigation/native";
import chat from "@/assets/icons/navigation/chat";
import ChatUserContainer from "@/src/components/Chat/ChatUserContainer";
import Message from "@/src/interface/Message";
import userFromUsername from "@/src/services/userFromUsername";

export const ChatSection: React.FC<ChatProps> = ({ navigation, userData }) => {
    const {messages, setMessages, dataLoading, refetchMessages } = getMessages();
    const [chats, setChats] = useState<Message[]>([]);

    useEffect(() => {
        const newChats: React.SetStateAction<Message[]> = [];

        for(let i = 0; i < messages.length; i++) {
            if ((messages[i].receiverName === userData.username || messages[i].senderName === userData.username)) {
                const otherUser = messages[i].receiverName === userData.username ? messages[i].senderName : messages[i].receiverName;

                const isOtherUserInChats = newChats.some(chat => chat.receiverName === otherUser || chat.senderName === otherUser);

                if (!isOtherUserInChats && otherUser) {
                    newChats.push(messages[i]);
                }
            }
        }

        setChats(newChats);

        if (messages.length === 0)
            return;

    }, [messages]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetchMessages();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View>
                {
                    chats.map((chat, index) => {
                        return (
                            <View key={index}>
                                {userData.username && <ChatUserContainer navigation={navigation} chat={chat} username={userData.username} role={userData.role} messages={messages} refetchMessages={refetchMessages} />}
                            </View>
                        );
                    })
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ChatSection;