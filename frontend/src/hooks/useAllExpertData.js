import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAllExpertData () {
    const [allExpertData, setAllExpertData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAllExpertData = async () => {
        try {
            const response = await fetch('http://192.168.73.191:8080/api/expert/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setAllExpertData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllExpertData();
    }, []);

    return { allExpertData, loading, refetchAllExpertData: fetchAllExpertData };
};