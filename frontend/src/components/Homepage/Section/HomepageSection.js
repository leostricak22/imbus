import {ActivityIndicator, Button, RefreshControl, ScrollView, StyleSheet, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useUserSessionData from "../../../hooks/useUserSessionData";
import {useEffect, useState} from "react";

export default function HomepageSection({navigation}) {
    const {userData, dataLoading, refetchUserData} = useUserSessionData()
    const [refreshing, setRefreshing] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        };

        getToken();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('login');
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await refetchUserData();
        setRefreshing(false);
    };

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            {
                dataLoading || !userData ? (
                    <ActivityIndicator size="large" color="#209cee"/>
                ) : (
                    <>
                        <Text style={styles.title}>Pozdrav, {userData.name}</Text>
                        <Text>ID: {userData.id}</Text>
                        <Text>Username: {userData.username}</Text>
                        <Text>Email: {userData.email}</Text>
                        <Text>Token: {token}</Text>
                    </>
                )
            }
            <Button title="Logout" onPress={handleLogout}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '80%',
        alignSelf: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
    },
});