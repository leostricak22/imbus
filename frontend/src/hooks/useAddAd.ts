import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAddAd = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const addAd = async (data: any) => {
        setUploading(true);
        setError(null);

        try {
            const response = await fetch('http://192.168.54.191:8080/api/ad/add', {
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

            console.log('Ad added successfully!');
        } catch (error) {
            // @ts-ignore
            setError(error);
        } finally {
            setUploading(false);
        }
    };

    return {addAd, uploading, error};
}

export default useAddAd;