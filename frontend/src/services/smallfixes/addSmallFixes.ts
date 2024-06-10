import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import envVars from "@/src/utils/envVars";

export default function addSmallFixes(requestData: any) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const addSmallFixes = async (data: any) => {
        setUploading(true);
        setError(null);

        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/smallfixes/add`, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to addSmallFixes!');
            }

        } catch (error) {
            // @ts-ignore
            setError(error);
        } finally {
            setUploading(false);
        }
    };

    return {publishSmallFixes:addSmallFixes, uploading, error};
}