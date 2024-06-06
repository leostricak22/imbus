import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import envVars from "@/src/utils/envVars";

type TokenState = boolean | null;

export default function validateToken () {
    const [validToken, setValidToken] = useState<TokenState>(null);

    const checkTokenValidity = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${envVars.API_ENDPOINT}/api/auth/validate`, {
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

    useEffect(() => {
        checkTokenValidity();
    }, []);

    return {validToken, checkTokenValidity};
};