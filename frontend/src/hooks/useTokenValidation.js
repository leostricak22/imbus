import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function useTokenValidation () {
    const [validToken, setValidToken] = useState('');

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://192.168.73.191:8080/api/auth/validate', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.data === true)
                        setValidToken(true);
                } else {
                    setValidToken(false);
                }
            } catch (error) {
                setValidToken(false);
            }
        };

        checkTokenValidity();

    }, []);

    return validToken;
};