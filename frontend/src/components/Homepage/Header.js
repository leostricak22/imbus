import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';

const logoImage = require("../../../assets/icon.png");
const notificationImage = require("../../../assets/icons/notification.png");
const defaultUserProfileImage = require("../../../assets/icons/defaultUserProfile.png");

export default function Header({navigation}) {
    return (
        <View style={styles.header}>
            <Pressable style={styles.defaultUserProfileContainer} onPress={() => navigation.navigate("accountsettings")}>
                <Image source={defaultUserProfileImage} style={styles.defaultUserProfileImage} />
            </Pressable>
            <Image source={logoImage} style={styles.logoImage} />
            <Image source={notificationImage} style={styles.notification} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#dce3de',
        borderBottomStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logoImage: {
        width: 60,
        height: 60,
    },
    defaultUserProfileImage: {
        position: 'absolute',
        left: 0,
        width: 30,
        height: 30,
    },
    defaultUserProfileContainer: {
        position: 'absolute',
        left: 15,
        width: 30,
        height: 30,
    },
    notification: {
        position: 'absolute',
        right: 15,
        width: 30,
        height: 30,
    },
});