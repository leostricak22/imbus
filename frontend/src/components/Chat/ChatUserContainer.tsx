import React, {useState} from "react";
import ChatProps from "@/src/types/chat/ChatProps";
import {View, StyleSheet, Text, Image, Pressable} from "react-native";
import ChatUserProps from "@/src/types/chat/ChatUserProps";
import Message from "@/src/interface/Message";
import {timeAgo} from "@/src/utils/dateFormat";
import {colors} from "@/src/styles/colors";
import userFromUsername from "@/src/services/user/userFromUsername";

export const ChatUserContainer: React.FC<ChatUserProps> = ({navigation, chat, username, role, messages, refetchMessages  }) => {
    const [hoverStates, setHoverStates] = useState({
        chat: false,
    });

    const { userFromUsernameData } = userFromUsername(username !== chat.senderName ? chat.senderName : chat.receiverName);

    const setHoverState = (key: any, value: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    }

    return (
        <Pressable style={[styles.container, hoverStates.chat && colors.backgroundLightGray]}
                    onPress={() => navigation.navigate('chat', {username: username !== chat.senderName ? chat.senderName : chat.receiverName})}
                    onPressIn={() => setHoverState("chat", true)}
                    onPressOut={() => setHoverState("chat", false)}
        >
            <View style={styles.profileImage}>
                <Image source={{uri: `data:image/jpeg;base64,${userFromUsernameData.profileImage}`}} style={styles.profileImage} />
            </View>
            <View style={styles.messageInfo}>
                <Text style={styles.messageSender}>{userFromUsernameData.name} {userFromUsernameData.surname}</Text>
                <Text style={[styles.messageContent , (!chat.opened && username !== chat.senderName) && {fontWeight: 'bold'}]}>
                    {(chat.message != null && !chat.suggestion) ? (chat.message.length > 20 ? chat.message.slice(0, 30) + '...' : chat.message) : chat.suggestion ? <Text style={{fontStyle:"italic", fontSize: 14, color: "gray"}}>Novi prijedlog</Text> : <Text style={{fontStyle:"italic", fontSize: 14, color: "gray"}}>Nema poruke</Text>}
                </Text>
            </View>
            <View style={styles.messageTime}>
                <Text style={role === "CLIENT" ? colors.blue : colors.orange}>{timeAgo(new Date(chat.date))}</Text>
            </View>
            {(!chat.opened && username !== chat.senderName) && <View style={[styles.opened, role === "CLIENT" ? colors.backgroundBlue : colors.backgroundOrange]}></View>}

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
    opened: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        width: 15,
        height: 15,
        borderRadius: 50,
    }
});

export default ChatUserContainer;