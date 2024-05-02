import { useState } from 'react';

export default function useValidateToken () {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const validateToken = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://192.168.73.191:8080/api/auth/validate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) throw new Error('Invalid token!');

            setIsTokenValid(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { token, setToken, setIsTokenValid, isTokenValid, loading, error, validateToken };
};