import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUpdateUser = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (formData) => {
        try {
            setUploading(true);

            const response = await fetch('http://192.168.73.191:8080/user/1', {
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            setError(error);
        } finally {
            setUploading(false);
        }
    };

    return { updateUser, uploading, error };
};

export default useUpdateUser;
