import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import UserData from "@/src/interface/UserData";

export default function userFromUsername(username: string) {
    const [userFromUsernameData, setUserFromUsernameData] = useState<UserData>({} as UserData);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserFromUsername = async (username: any) => {
        try {
            console.log('fetchUserFromUsername', username)
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${envVars.API_ENDPOINT}/user/${username}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserFromUsernameData(data);
            } else {
                throw new Error('Failed fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserFromUsername(username);
    }, [username]);

    return { userFromUsernameData, setUserFromUsernameData, loading, refetchUserFromUsername: fetchUserFromUsername };
};
