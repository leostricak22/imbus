import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAllOfferData (adId) {
    const [allOfferData, setAllOfferData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAllOfferData = async () => {
        try {
            console.log('http://192.168.73.191:8080/api/offer/'+adId)
            const response = await fetch('http://192.168.73.191:8080/api/offer/'+adId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();

            setAllOfferData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOfferData();
    }, []);

    return { allOfferData, loading, refetchAllOfferData: fetchAllOfferData };
};