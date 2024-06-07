import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import Header from '../components/Homepage/Header';
import Navigation from '../components/Homepage/Navigation';
import HomepageSection from '../components/Homepage/Section/HomepageSection';
import ExpertsSection from '../components/Homepage/Section/Expert/ExpertsSection';

import validateToken from '../services/validateToken';
import userSessionData from "../services/userSessionData";
import {useFocusEffect} from "@react-navigation/native";
import AdSection from "../components/Homepage/Section/Ads/AdSection";
import {NavigationProp} from "@react-navigation/core";
import {valid} from "@react-native-community/cli-platform-android/build/config/__fixtures__/android";
import {NavigationParameter} from "@/src/types/NavigationParameter";

export const Homepage: React.FC<NavigationParameter> = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const {userData, dataLoading, refetchUserData} = userSessionData()
    const [selectedSection, setSelectedSection] = useState(0);
    const [firstFocus, setFirstFocus] = useState(true);

    const {validToken, checkTokenValidity} = validateToken();

    useEffect(() => {
        checkTokenValidity();
        console.log('Section changed to:', selectedSection);
    }, [selectedSection]);

    useEffect(() => {
        console.log(validToken)
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
                        <Text>Posts</Text>
                    ) : selectedSection === 2 ? (
                        <Text>Messages</Text>
                    ) : selectedSection === 3 ? (
                        <ExpertsSection navigation={navigation} />
                    ) : selectedSection === 4 ? (
                        <Text>Calendar</Text>
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