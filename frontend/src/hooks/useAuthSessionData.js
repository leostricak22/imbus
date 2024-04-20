import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuthSessionData () {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAuthData = async () => {
        try {
            const response = await fetch('http://192.168.73.191:8080/api/auth/sessionUser', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setAuthData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthData();
    }, []);

    return { authData, loading, refetchAuthData: fetchAuthData };
};