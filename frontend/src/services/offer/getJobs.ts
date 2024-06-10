import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import Filter from "@/src/interface/Filter";
import Job from "@/src/interface/Job";
export default function getJobs () {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/offer/jobs`, {
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
            setJobs(data);
        } catch (error) {
            console.error('Info fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return { jobs, refetchJobs: fetchJobs, loading };
};