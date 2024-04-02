import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';

import Header from './Header';
import Navigation from './Navigation';

export default function Homepage({ setIsLoggedIn }) {
    return (
        <View style={styles.container}>
            <Header />
            <Navigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});