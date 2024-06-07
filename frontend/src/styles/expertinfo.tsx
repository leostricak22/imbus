import {StyleSheet} from "react-native";

export const expertinfo = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
        marginRight: 10,

    },
    expertInfoContainer: {
        marginTop: 15,
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignSelf: 'center',
    },
    rating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    categories: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        width: '60%',
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        width: '40%',
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInfo: {
        marginLeft: 5,
    },
    ratingCount: {
        marginLeft: 5,
        color: '#b3b3b3',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: "space-between",
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 0,
    }
});