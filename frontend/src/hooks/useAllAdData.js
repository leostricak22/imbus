import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAllAdData () {
    const [allAdData, setAllAdData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState( {});

    const fetchAllAdData = async () => {
        try {
            const response = await fetch('http://192.168.73.191:8080/api/ad/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify(filters)
            });

            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setAllAdData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllAdData();
    }, []);

    return { allAdData, loading, refetchAllAdData: fetchAllAdData, filters, setFilters };
};