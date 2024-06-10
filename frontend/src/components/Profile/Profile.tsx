import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyWindow: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImage}></View>
                <Text style={styles.fullName}>Mate Matić</Text>
            </View>
            <View style={styles.boxContainer}>
                <View style={[styles.box, styles.premiumBox]}>
                    <Text style={[styles.boxText, styles.premiumText]}>Premium</Text>
                    <Text style={[styles.boxText, styles.premiumText]}>plan</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>Pozovi</Text>
                    <Text style={styles.boxText}>prijatelja</Text>
                </View>
            </View>
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                    <Text style={styles.rectangleText}>Moj profil</Text>
                </View>
                <View style={styles.rectangle}>
                    <Text style={styles.rectangleText}>Postavke</Text>
                </View>
                <View style={styles.rectangle}>
                    <Text style={styles.rectangleText}>Odjava</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    header: {
        alignItems: 'center',
    },
    profileImage: {
        width: 141,
        height: 141,
        borderRadius: 100,
        backgroundColor: '#cccccc',
        marginBottom: 10,
    },
    fullName: {
        fontSize: 20,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 20,
    },
    box: {
        width: '48%',
        height: 88,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        fontWeight: 'bold',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.78,
        elevation: 15
    },
    premiumText: {

        color: '#FFBF49',
    },
    premiumBox: {
        borderColor: '#FFBF49',
    },

    boxText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    rectangleContainer: {
        alignItems: 'center',
        width: '100%'
    },
    rectangle: {
        width: '90%',
        height: 44,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.78,
        elevation: 15
    },
    rectangleText: {
        fontSize: 20,
    },
});

export default MyWindow;