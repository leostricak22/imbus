import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';

logoImage = require("../../../assets/icon.png");
backIconImage = require("../../../assets/icons/back.png");
defaultUserProfileImage = require("../../../assets/icons/defaultUserProfile.png");

export default function Header() {
    return (
        <View style={styles.header}>
            <Image source={backIconImage} style={styles.backIconImage} />
            <Image source={logoImage} style={styles.logoImage} />
            <Image source={defaultUserProfileImage} style={styles.defaultUserProfileImage} />
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
    },
    logoImage: {
        width: 60,
        height: 60,
    },
    backIconImage: {
        position: 'absolute',
        left: 15,
        width: 20,
        height: 20,
    },
    defaultUserProfileImage: {
        position: 'absolute',
        right: 15,
        width: 30,
        height: 30,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
});