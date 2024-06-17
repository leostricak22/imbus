import {ActivityIndicator, BackHandler, Button, RefreshControl, ScrollView, StyleSheet, Text, View, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import getAds from "@/src/services/ad/getAds";
import getUserAds from "@/src/services/ad/getUserAds";
import AdContainer from "@/src/components/Ad/AdContainer";
import getExperts from "@/src/services/expert/getExperts";
import getJobs from "@/src/services/offer/getJobs";
import Jobs from "@/src/components/Jobs/Jobs";
import {useFocusEffect} from "@react-navigation/native";

export default function HomepageSection({navigation, userData, dataLoading, jobs, onRefresh, refreshing}: any) {
    const [token, setToken] = useState(null);
    const [pickedAd, setPickedAd] = useState(null);
    const { allUserAdData, refetchAllUserAdData, dataLoading:loading} = getUserAds();

    useEffect(() => {
        const getToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            // @ts-ignore
            setToken(storedToken);
        };

        getToken();
        setPickedAd(ads[Math.floor(Math.random() * ads.length)]);
    }, []);

    useEffect(() => {
        if(refreshing) {
            refetchAllUserAdData();
            setPickedAd(ads[Math.floor(Math.random() * ads.length)]);
        }
    }, [refreshing]);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('login');
    };

    const ads = [
        require("@/assets/ads/mima.jpg"),
        require("@/assets/ads/emmezeta.jpg"),
        require("@/assets/ads/bauhaus.jpg"),
        require("@/assets/ads/pevex.png"),
        require("@/assets/ads/prima.jpg"),
        require("@/assets/ads/tacta.png"),
    ]

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
                !userData.premium && (
                    <View style={styles.ad}>
                        {pickedAd &&
                        <Image
                            style={styles.adImage}
                            source={pickedAd}
                            resizeMode="cover"
                        />
                        }
                    </View>
                )
            }
            {
                userData && userData.role === 'CLIENT' ? (
                    <>
                        <Text style={styles.title}>Moji oglasi:</Text>
                        {loading ? <ActivityIndicator size="large" color="#0478ca" />:
                            allUserAdData.length > 0 ? (allUserAdData.map((ad: AdForm) => (
                                <AdContainer key={ad.id} ad={ad} navigation={navigation} refreshing={refreshing} role={"CLIENT"} />
                                ))
                            ) : (
                                <Text style={styles.noAds}>Nemate postavljenih oglasa.</Text>
                            )
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
        alignSelf: 'center',
    },
    title: {
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    noAds: {
        marginLeft: 15,
        fontSize: 16,
        color: 'gray',
    },
    ad: {
        width: '100%',
        height: 200,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    adImage: {
        width: '100%',
        height: '100%',
    }
});