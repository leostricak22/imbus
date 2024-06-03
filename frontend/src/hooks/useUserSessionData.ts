import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserData} from "@expo/config/build/getUserState";

export default function useUserSessionData () {
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://192.168.54.191:8080/api/auth/sessionUser', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                throw new Error('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { userData, setUserData, dataLoading:loading, refetchUserData: fetchUserData };
};