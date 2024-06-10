import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import Filter from "@/src/interface/Filter";
import {UserData} from "@expo/config/build/getUserState";
export default function getRatings (user:UserData) {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRatingsData = async () => {
        try {
            console.log(user)

            const response = await fetch(`${envVars.API_ENDPOINT}/ratings/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Info fetching data');
            }
            const data = await response.json();
            setRatings(data);
        } catch (error) {
            console.error('Info fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRatingsData();
    }, []);

    return { ratings, refetchRatingsData: fetchRatingsData };
};