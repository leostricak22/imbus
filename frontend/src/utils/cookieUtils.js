import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCookie = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Cookie saved successfully!');
    } catch (error) {
        console.error('Error saving cookie:', error);
    }
};

export const getCookie = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving cookie:', error);
        return null;
    }
};

export const getSessionToken = async () => {
    const sessionToken = await getCookie('token');
    return sessionToken;
};