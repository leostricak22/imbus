import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import envVars from "@/src/utils/envVars";

export default function addAd(requestData: any) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const addAd = async (data: any) => {
        setUploading(true);
        setError(null);

        try {
            console.log(123)
            const response = await fetch(`${envVars.API_ENDPOINT}/api/ad/add`, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add ad!');
            }

        } catch (error) {
            // @ts-ignore
            setError(error);
        } finally {
            setUploading(false);
        }
    };

    return {publishAd:addAd, uploading, error};
}