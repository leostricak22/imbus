import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";

export default function getOffers (adId: string) {
    const [allOfferData, setAllOfferData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOfferData = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/offer/${adId}`, {
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

    return { allOfferData, dataLoading: loading, refetchAllOfferData: fetchAllOfferData };
};