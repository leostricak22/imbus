import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

import React from 'react';

import Header from './Header';
import Navigation from './Navigation';
import HomepageSection from './Section/HomepageSection';
import ExpertsSection from './Section/Expert/ExpertsSection';

import useTokenValidation from '../../hooks/useTokenValidation';
import useUserSessionData from "../../hooks/useUserSessionData";
import {useFocusEffect} from "@react-navigation/native";
import AdSection from "./Section/Ads/AdSection";
export default function Homepage({navigation}) {
    const [refreshing, setRefreshing] = useState(false);
    const {userData, dataLoading, refetchUserData} = useUserSessionData()
    const [selectedSection, setSelectedSection] = useState(0);
    const [firstFocus, setFirstFocus] = useState(true);

    const validToken = useTokenValidation();

    useEffect(() => {
        console.log('Section changed to:', selectedSection);
    }, [selectedSection]);

    useEffect(() => {
        if (validToken !== '' && !validToken) {
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
                        <HomepageSection userData={userData} dataLoading={dataLoading} onRefresh={onRefresh} refreshing={refreshing}></HomepageSection>
                    ) : selectedSection === 1 ? (
                        <Text>Posts</Text>
                    ) : selectedSection === 2 ? (
                        <Text>Messages</Text>
                    ) : selectedSection === 3 ? (
                        <ExpertsSection />
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