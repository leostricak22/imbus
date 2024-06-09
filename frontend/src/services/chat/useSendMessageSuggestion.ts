import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import Message from "@/src/interface/Message";

export default function useSendMessageSuggestion(otherUser: string) {

    const [form, setForm] = useState({ date: '', time: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const confirm = async () => {
        let date = new Date(form.date);
        date.setHours(parseInt(form.time));
        date.setMinutes(0);

        console.log("other" , otherUser);


        let message = {} as Message;
        message.message = date.toISOString();
        message.receiverName = otherUser;
        message.status = "MESSAGE";

        try {
            setLoading(true);
            const response = await fetch(`${envVars.API_ENDPOINT}/chat/suggestion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify(message),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            // @ts-ignore
            setError(error.message);
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return { form, setForm, confirm, loading, error };
};