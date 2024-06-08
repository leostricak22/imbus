import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
export default function getAds () {
    const [allAdData, setAllAdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState( {});

    const fetchAllAdData = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/ad/filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify(filters)
            });

            console.log(response)

            if (!response.ok) {
                throw new Error('Info fetching data');
            }
            const data = await response.json();
            setAllAdData(data);
        } catch (error) {
            console.error('Info fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllAdData();
    }, []);

    return { allAdData, dataLoading:loading, refetchAllAdData: fetchAllAdData, filters, setFilters };
};