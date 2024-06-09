import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import UserData from "@/src/interface/UserData";

export default function userSessionData () {
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/auth/sessionUser`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                throw new Error('Info fetching data');
            }
        } catch (error) {
            console.error('Info fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { userData, setUserData, dataLoading:loading, refetchUserData: fetchUserData };
};