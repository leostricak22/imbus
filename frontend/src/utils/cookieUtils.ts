import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCookie = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Info saving cookie:', error);
    }
};

export const getCookie = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Info retrieving cookie:', error);
        return null;
    }
};

export const getSessionToken = async () => {
    return await getCookie('token');
};