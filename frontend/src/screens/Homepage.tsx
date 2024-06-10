import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import Header from '../components/Homepage/Header';
import Navigation from '../components/Homepage/Navigation';
import HomepageSection from '../components/Homepage/HomepageSection';
import ExpertsSection from '@/src/components/Expert/ExpertsSection';

import validateToken from '../services/user/validateToken';
import userSessionData from "../services/user/userSessionData";
import {useFocusEffect} from "@react-navigation/native";
import AdSection from "../components/Ad/AdSection";
import {NavigationProp} from "@react-navigation/core";
import {valid} from "@react-native-community/cli-platform-android/build/config/__fixtures__/android";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import Chat from "@/assets/icons/navigation/chat";
import ChatSection from "@/src/components/Chat/ChatSection";
import CalendarEvents from "@/src/components/Calendar/CalendarEvents";
import SmallFixesSection from "@/src/components/SmallFixes/SmallFixesSection";

export const Homepage: React.FC<NavigationParameter> = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const {userData, dataLoading, refetchUserData} = userSessionData()
    const [selectedSection, setSelectedSection] = useState(0);
    const [firstFocus, setFirstFocus] = useState(true);

    const {validToken, checkTokenValidity} = validateToken();

    useEffect(() => {
        checkTokenValidity();
    }, [selectedSection]);

    useEffect(() => {
        if (validToken !== null && !validToken) {
            navigation.navigate('login');
        }
    }, [validToken, navigation]);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetchUserData();
        setRefreshing(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            if (!firstFocus) {
                onRefresh();
            } else {
                setFirstFocus(false);
            }
        }, [firstFocus])
    );

    return (
        <View style={styles.container}>
            <Header navigation={navigation} userData={userData}/>
            <View style={styles.section}>
                {
                    selectedSection === 0 ? (
                        <HomepageSection navigation={navigation} userData={userData} dataLoading={dataLoading} onRefresh={onRefresh} refreshing={refreshing} />
                    ) : selectedSection === 1 ? (
                        <SmallFixesSection navigation={navigation}/>
                    ) : selectedSection === 2 ? (
                        <ChatSection navigation={navigation} route={route} userData={userData} />
                    ) : selectedSection === 3 ? (
                        <ExpertsSection navigation={navigation} />
                    ) : selectedSection === 4 ? (
                        <CalendarEvents navigation={navigation}/>
                    ) : (
                        <AdSection navigation={navigation} />
                    )
                }
            </View>
            <View style={styles.navigation}>
                <Navigation navigation={navigation} selectedSection={selectedSection} setSelectedSection={setSelectedSection} userData={userData}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    section: {
        flex: 1,
        marginBottom: 70,
    },
});