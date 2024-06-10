import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import Filter from "@/src/interface/Filter";
export default function getSmallFixes () {
    const [allSmallFixesData, setAllSmallFixesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filter[]>([]);

    const fetchAllSmallFixesData = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/smallfixes/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Info fetching data');
            }
            const data = await response.json();
            setAllSmallFixesData(data);
        } catch (error) {
            console.error('Info fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSmallFixesData();
    }, []);

    return { allSmallFixesData, dataLoading:loading, refetchAllSmallFixesData: fetchAllSmallFixesData, filters, setFilters };
};