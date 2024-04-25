import React from 'react';
import {useEffect, useState} from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/components/Login';
import Homepage from './src/components/Homepage/Homepage';
import AccountSettings from "./src/components/Account/AccountSettings";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.safeArea}>
                <Stack.Navigator initialRouteName="login">
                    <Stack.Screen
                        name="login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="homepage"
                        component={Homepage}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="accountsettings"
                        component={AccountSettings}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
    }
});