import React from "react";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import {StyleSheet, View, Text, Pressable} from "react-native";
import ChatProps from "@/src/types/ChatProps";
import {colors} from "@/src/styles/colors";
import {SvgXml} from "react-native-svg";
import logo from "@/assets/icons/logo";
import arrow_back from "@/assets/icons/header/arrow_back";
import arrow_back_client from "@/assets/icons/chat/arrow_back_client";
import more_vert_client from "@/assets/icons/chat/more_vert_client";

export const ChatHeader: React.FC<ChatProps> = ({navigation, userData  }) => {
    return (
        <View style={[styles.container, userData.role == "CLIENT" ? colors.backgroundBlue : colors.backgroundOrange]}>
            <View style={styles.iconContainer}>
                <Pressable style={styles.icon}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={arrow_back_client}
                    />
                </Pressable>
            </View>
            <View style={styles.userInfo}>
                <View style={styles.profileImage}>

                </View>
                <Text style={[styles.userNameSurname, userData.role == "CLIENT" ? colors.white : colors.black]}>{userData.name} {userData.surname}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Pressable style={styles.icon}>
                    <SvgXml
                        width="90%"
                        height="90%"
                        xml={more_vert_client}
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 15,
    },
    userInfo: {
        flexDirection: 'row',
        width: '70%',
    },

    profileImage: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'gray',
        marginRight: 10,
    },
    userNameSurname: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    iconContainer: {
        alignSelf: 'center',
        width: '15%',
    }
})

export default ChatHeader;