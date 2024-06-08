import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import envVars from "@/src/utils/envVars";
import AdSmallFixesDialogProps from "@/src/types/DialogProps";

const addOffer = ({ requestData }: AddOfferProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const publishOffer = async (data: any) => {
        setUploading(true);
        setError(null);

        try {
            console.log("data is",JSON.stringify(data))
            const response = await fetch(`${envVars.API_ENDPOINT}/api/offer/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
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

    return {publishOffer, uploading, error};
}

export default addOffer;