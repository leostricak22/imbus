import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';

import Header from './Header';
import Navigation from './Navigation';
import useAuthSessionData from '../../hooks/useAuthSessionData';

export default function Homepage({ setIsLoggedIn }) {
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        console.log('Section changed to:', selectedSection);
    }, [selectedSection]);

    const { authData, loading } = useAuthSessionData()

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!authData) {
        return <Text>No data available</Text>;
    }

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.container}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
                        <Text>{authData.id}</Text>
                        <Text>{authData.username}</Text>
                        <Text>{authData.email}</Text>
                    </>
                )}
            </ScrollView>
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