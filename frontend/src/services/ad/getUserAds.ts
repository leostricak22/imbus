import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import Filter from "@/src/interface/Filter";
export default function getUserAds () {
    const [allUserAdData, setAllUserAdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filter[]>([]);

    const fetchAllUserAdData = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/ad/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Info fetching data');
            }
            const data = await response.json();
            setAllUserAdData(data);
        } catch (error) {
            console.error('Info fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUserAdData();
    }, []);

    return { allUserAdData, dataLoading:loading, refetchAllUserAdData: fetchAllUserAdData, filters, setFilters };
};