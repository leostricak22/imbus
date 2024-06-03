import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";

export default function updateUser(formData: any) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (formData: any) => {
        try {
            setUploading(true);

            const response = await fetch(`${envVars.API_ENDPOINT}/user/`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update user!');
            }
        } catch (error) {
            // @ts-ignore
            setError(error);
        } finally {
            setUploading(false);
        }
    };

    return { updateUser, uploading, error };
};