import React, {useState} from "react";
import ChatProps from "@/src/types/ChatProps";
import {Message} from "postcss";
import {View, StyleSheet, Text, Image, Pressable} from "react-native";
import ChatUserProps from "@/src/types/ChatUserProps";
import message from "@/src/interface/Message";
import {timeAgo} from "@/src/utils/dateFormat";
import {colors} from "@/src/styles/colors";

export const ChatUserContainer: React.FC<ChatUserProps> = ({navigation, chat, username, role  }) => {
    const [hoverStates, setHoverStates] = useState({
        chat: false,
    });

    const setHoverState = (key: any, value: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    }

    return (
        <Pressable style={[styles.container, hoverStates.chat && colors.backgroundLightGray]}
                    onPress={() => navigation.navigate('chat', {username: username})}
                    onPressIn={() => setHoverState("chat", true)}
                    onPressOut={() => setHoverState("chat", false)}
        >
            <View style={styles.profileImage}>

            </View>
            <View style={styles.messageInfo}>
                <Text style={styles.messageSender}>{username !== chat.senderName ? chat.senderName : chat.receiverName}</Text>
                <Text style={styles.messageContent}>
                    {chat.message.length > 20 ? chat.message.slice(0, 30) + '...' : chat.message}
                </Text>
            </View>
            <View style={styles.messageTime}>
                <Text style={colors.blue}>{timeAgo(new Date(chat.date))}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    profileImage: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: 'gray',
    },
    messageInfo: {
        flex: 1,
        marginLeft: 10,
    },
    messageSender: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    messageTime: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    messageContent: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default ChatUserContainer;