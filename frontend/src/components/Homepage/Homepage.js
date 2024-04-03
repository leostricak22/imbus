import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';

import Header from './Header';
import Navigation from './Navigation';

export default function Homepage({ setIsLoggedIn }) {
    const [selectedSection, setSelectedSection] = useState(0); 

    useEffect(() => {
        console.log('Section changed to:', selectedSection); 
    }, [selectedSection]); 

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.navigation}>
                <Navigation selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: 'lightblue',
    },
    navigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});