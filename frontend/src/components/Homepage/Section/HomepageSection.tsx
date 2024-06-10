import {ActivityIndicator, Button, RefreshControl, ScrollView, StyleSheet, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import getAds from "@/src/services/ad/getAds";
import getUserAds from "@/src/services/ad/getUserAds";
import AdContainer from "@/src/components/Homepage/Section/Ads/AdContainer";
import getExperts from "@/src/services/expert/getExperts";
import getJobs from "@/src/services/offer/getJobs";
import Jobs from "@/src/components/Jobs/Jobs";

export default function HomepageSection({navigation, userData, dataLoading, jobs, onRefresh, refreshing}: any) {
    const [token, setToken] = useState(null);
    const { allUserAdData, refetchAllUserAdData, dataLoading:loading} = getUserAds();

    useEffect(() => {
        const getToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            // @ts-ignore
            setToken(storedToken);
        };

        getToken();
    }, []);

    useEffect(() => {
        console.log(jobs)
    }, [jobs]);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('login');
    };

    let currentDate = new Date();
    let isoString = currentDate.toISOString();

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            {
                userData && userData.role === 'CLIENT' ? (
                    <>
                        <Text style={styles.title}>Moji oglasi:</Text>
                        {loading ? <ActivityIndicator size="large" color="#0478ca" />:
                            allUserAdData.map((ad: AdForm) => (
                                <AdContainer key={ad.id} ad={ad} navigation={navigation} refreshing={refreshing} role={"CLIENT"} />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Današnji raspored:</Text>
                        <Jobs date={isoString} jobs={jobs} navigation={navigation} refreshing={refreshing} noEventsMessage={"Nema poslova za danas."} />
                    </>
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        paddingTop: 20,
    },
    title: {
        marginLeft: 15,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});