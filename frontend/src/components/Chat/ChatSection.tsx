import React, {useEffect, useState} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import ChatProps from "@/src/types/chat/ChatProps";
import userSessionData from "@/src/services/user/userSessionData";
import getMessages from "@/src/services/chat/getMessages";
import {useFocusEffect} from "@react-navigation/native";
import chat from "@/assets/icons/navigation/chat";
import ChatUserContainer from "@/src/components/Chat/ChatUserContainer";
import Message from "@/src/interface/Message";
import userFromUsername from "@/src/services/user/userFromUsername";
import ChatSectionProps from "@/src/types/chat/ChatSectionProps";

export const ChatSection: React.FC<ChatSectionProps> = ({ navigation, userData, chats, refetchMessages, messages }) => {
    return (
        <ScrollView style={styles.container}>
            <View>
                {
                    chats.map((chat: Message, index: React.Key | null | undefined) => {
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