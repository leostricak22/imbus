import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {ProgressBarProps} from "@/src/types/form/ProgressBarProps";

export const ProgressBar: React.FC<ProgressBarProps> = ({ step, maxStep }) => {
    console.log(100/maxStep)
    return (
        <View style={styles.container}>
            <Text style={styles.stepCount}>Koraci {step} od {maxStep}</Text>
            <View style={styles.barContainer}>
                <View style={[styles.bar, { width: `${(step) * (100/maxStep)}%` }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    barContainer: {
        width: '100%',
        height: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 50,
    },
    bar: {
        height: '100%',
        backgroundColor: '#0478ca',
        borderRadius: 50,
    },
    stepCount : {
        alignSelf: 'flex-end',
        color: '#0478ca',
    }
});

export default ProgressBar;