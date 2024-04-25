import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';

const logoImage = require("../../../assets/icon.png");
const backIconImage = require("../../../assets/icons/back.png");

export default function Header({navigation}) {
    return (
        <View style={styles.header}>
            <Pressable style={styles.backIconContainer} onPress={() => navigation.goBack()}>
                <Image source={backIconImage} style={styles.backIconImage} />
            </Pressable>
            <Image source={logoImage} style={styles.logoImage} />
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
    backIconImage: {
        position: 'absolute',
        left: 0,
        width: 20,
        height: 20,
    },
    backIconContainer: {
        position: 'absolute',
        left: 15,
        width: 30,
        height: 30,
    },
});