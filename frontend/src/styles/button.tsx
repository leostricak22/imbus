import {StyleSheet} from "react-native";

export const button = StyleSheet.create({
    buttonContainer: {
        borderRadius: 100,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#0478ca',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 4,
    },
    buttonIcon: {
        width: 45,
        padding: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})