import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import envVars from "@/src/utils/envVars";
import UserData from "@/src/interface/UserData";
import Message from "@/src/interface/Message";

export default function getMessages () {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/chat/messages/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                throw new Error('Info fetching data');
            }
        } catch (error) {
            console.error('Info fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return { messages, setMessages, dataLoading:loading, refetchMessages: fetchMessages };
};