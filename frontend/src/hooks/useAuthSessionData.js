import { useState, useEffect } from 'react';

export default function useAuthSessionData () {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.73.191:8080/api/auth/sessionUser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('Error fetching data:', error);
                }
                const data = await response.json();
                setAuthData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
        };
    }, []);

    return { authData, loading };
};