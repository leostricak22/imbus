import {ActivityIndicator, Button, RefreshControl, ScrollView, StyleSheet, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAuthSessionData from "../../../hooks/useAuthSessionData";
import {useEffect, useState} from "react";

export default function HomepageSection({navigation}) {
    const {authData, dataLoading, refetchAuthData} = useAuthSessionData()
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
        await refetchAuthData();
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
                dataLoading || !authData ? (
                    <ActivityIndicator size="large" color="#209cee"/>
                ) : (
                    <>
                        <Text style={styles.title}>Pozdrav, {authData.name}</Text>
                        <Text>ID: {authData.id}</Text>
                        <Text>Username: {authData.username}</Text>
                        <Text>Email: {authData.email}</Text>
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