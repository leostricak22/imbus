import React from "react";
import { NavigationParameter } from "@/src/types/navigation/NavigationParameter";
import {View, Text, StyleSheet, ScrollView, Pressable} from "react-native";
import ExpertContainerProps from "@/src/types/expert/ExpertContainerProps";

const RatingsContainer: React.FC<ExpertContainerProps> = ({ navigation, expert}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recenzije:</Text>
            <ScrollView style={styles.ratingContainer}>
                <Text style={styles.smallText}>Nema recenzija!</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    smallText: {
        fontSize: 14,
        color: 'grey',
        textAlign: 'center',
        marginTop: 100,
    },
    ratingContainer: {
        height: '100%',
        width: '100%',
    },

});

export default RatingsContainer;
