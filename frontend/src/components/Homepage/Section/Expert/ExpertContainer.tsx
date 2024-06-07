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
        <Pressable style={styles.container}
            onPress={openUserPage}
        >
            <ExpertInfo navigation={navigation} expert={expert} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#0478ca',
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white',

    },

});

export default ExpertContainer;