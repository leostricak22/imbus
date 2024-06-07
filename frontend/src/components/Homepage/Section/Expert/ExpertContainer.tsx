import {Image, Pressable, StyleSheet, Text, View} from "react-native";

import React from 'react';

import {categoryTypes} from "@/src/data/CategoryTypes";
import {counties} from "@/src/data/Counties";
import {SvgXml} from 'react-native-svg';
import AccountProfileImage from "../../../../../assets/icons/Account/AccountProfileImage";
import StarRating from "@/src/components/Ratings/StarRating";
import facebook from "@/assets/icons/companies/facebook";
import build from "@/assets/icons/info/build";
import location from "@/assets/icons/info/location";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import ExpertContainerProps from "@/src/types/ExpertContainerProps";
import {expertinfo} from "@/src/styles/expertinfo";
import ExpertInfo from "@/src/components/Homepage/Section/Expert/ExpertInfo";

const ExpertContainer: React.FC<ExpertContainerProps> = ({ navigation , expert}) => {
    const openUserPage = () => {
        navigation.navigate("user-page", {expert: expert});
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable}
                onPress={openUserPage}
            >
                <ExpertInfo navigation={navigation} expert={expert} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '5%',
        marginVertical: 5,
    },
    pressable: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#0478ca',
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white',

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 4
    },

});

export default ExpertContainer;