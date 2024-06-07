import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import {FiltersProps} from "@/src/types/FiltersProps";
import Filter from "@/src/interface/Filter";
export default function getExperts () {
    const [allExpertData, setAllExpertData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filter[]>([]);

    const fetchAllExpertData = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/expert/filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify({"filters":filters})
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

    return { allExpertData, dataLoading: loading, refetchAllExpertData: fetchAllExpertData, filters, setFilters };
};