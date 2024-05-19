import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUserSessionData () {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return { userData, setUserData, loading, refetchUserData: fetchUserData };
};