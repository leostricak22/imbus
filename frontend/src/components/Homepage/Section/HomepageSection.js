import {ActivityIndicator, Button, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthSessionData from "../../../hooks/useAuthSessionData";
import {useState} from "react";

export default function HomepageSection({navigation}) {
    const { authData, dataLoading, refetchAuthData } = useAuthSessionData()
    const [refreshing, setRefreshing] = useState(false);

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
                dataLoading ? (
                    <ActivityIndicator size="large" color="#209cee" />
                ) : !authData ? (
                    <Text>No data available</Text>
                ) : (
                    <>
                        <Text style={styles.title}>Pozdrav, {authData.name}</Text>
                        <Text>ID: {authData.id}</Text>
                        <Text>Username: {authData.username}</Text>
                        <Text>Email: {authData.email}</Text>
                    </>
                )
            }
            <Button title="Logout" onPress={handleLogout} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
    },
    title: {
        fontSize: 24,
    },
});