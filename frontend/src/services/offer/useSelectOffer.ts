import { useState } from 'react';
import envVars from "@/src/utils/envVars";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useSelectOffer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const selOffer = async (offerId: number) => {
        setError(null);
        setLoading(true);

        try {
            console.log(`${envVars.API_ENDPOINT}/api/offer/select/${offerId}`)
            const response = await fetch(`${envVars.API_ENDPOINT}/api/offer/select/${offerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });

            if (response.status === 401) throw new Error('Pogreška!');

            const responseJson = await response.json();

        } catch (error) {
            // @ts-ignore
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { selOffer, loading, error };
}