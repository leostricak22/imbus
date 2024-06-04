import {StyleSheet} from "react-native";

export const input = StyleSheet.create({
    inputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 100,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 10,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 5,
    },
    input: {
        width: '85%',
        padding: 10,
        paddingLeft: 0,
        height: 50,
        fontSize: 16,
    },
    inputShowHide: {
        width: '65%',
        padding: 10,
        paddingLeft: 0,
        height: 50,
        fontSize: 16,
    },
    inputIcon: {
        width: 45,
        padding: 10,
    },
})