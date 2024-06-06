import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

const useKeyboard = () => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const _keyboardDidShow = () => {
            setKeyboardVisible(true);
        };

        const _keyboardDidHide = () => {
            setKeyboardVisible(false);
        };

        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    return keyboardVisible;
};

export default useKeyboard;
