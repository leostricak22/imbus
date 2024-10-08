import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Login} from '@/src/screens/Login';
import {Register} from "@/src/screens/Register";
import {Homepage} from '@/src/screens/Homepage';
import {AccountSettings} from "@/src/screens/AccountSettings";
import {AddAd} from "@/src/screens/AddAd";
import {ViewAd} from "@/src/screens/ViewAd";
import UserPage from "@/src/screens/UserPage";
import Chat from "@/src/screens/Chat";
import AddSmallFixes from "@/src/screens/AddSmallFixes";
import Premium from "@/src/components/Premium/Premium";
import ViewSmallFixes from "@/src/screens/ViewSmallFixes";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.safeArea}>
                <Stack.Navigator initialRouteName="login">
                    <Stack.Screen
                        name="register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
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
                    <Stack.Screen
                        name="premium"
                        component={Premium}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="add-ad"
                        component={AddAd}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="add-small-fixes"
                        component={AddSmallFixes}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="view-ad"
                        component={ViewAd}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="small-fixes-view"
                        component={ViewSmallFixes}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="user-page"
                        component={UserPage}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="chat"
                        component={Chat}
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