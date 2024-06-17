import {Image, Pressable, StyleSheet, Text, View} from "react-native";

import React, {useEffect, useState} from 'react';

import {categoryTypes} from "@/src/data/CategoryTypes";
import {counties} from "@/src/data/Counties";
import {SvgXml} from 'react-native-svg';
import AccountProfileImage from "../../../assets/icons/Account/AccountProfileImage";
import StarRating from "@/src/components/Ratings/StarRating";
import facebook from "@/assets/icons/companies/facebook";
import build from "@/assets/icons/info/build";
import location from "@/assets/icons/info/location";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import ExpertContainerProps from "@/src/types/expert/ExpertContainerProps";
import {expertinfo} from "@/src/styles/expertinfo";
import ExpertInfo from "@/src/components/Expert/ExpertInfo";

const ExpertContainer: React.FC<ExpertContainerProps> = ({ navigation , expert, ad=false}) => {
    const [pickedAd, setPickedAd] = useState(null);

    const openUserPage = () => {
        if(!ad)
            navigation.navigate("user-page", {expert: expert});
    }

    function averageRating () {
        let sum = 0;
        expert.ratings.forEach((rating: { rating: number; }) => {
            sum += rating.rating;
        });

        if(sum==0)
            return (0).toFixed(1);

        return (sum / expert.ratings.length).toFixed(1);
    }

    const ads = [
        require("@/assets/ads/mima.jpg"),
        require("@/assets/ads/emmezeta.jpg"),
        require("@/assets/ads/bauhaus.jpg"),
        require("@/assets/ads/pevex.png"),
        require("@/assets/ads/prima.jpg"),
        require("@/assets/ads/tacta.png"),
    ]

    useEffect(() => {
        setPickedAd(ads[Math.floor(Math.random() * ads.length)]);
    }, []);

    return (
        <View style={styles.container}>
            <Pressable style={[styles.pressable, expert.premium && {borderColor: "#edf11d"}]}
                onPress={openUserPage}
            >
                {!ad ?
                    <ExpertInfo navigation={navigation} expert={expert} container={true} />
                    :
                    <View style={styles.ad}>
                        {pickedAd &&
                            <Image
                                style={styles.adImage}
                                source={pickedAd}
                                resizeMode="cover"
                            />
                        }
                    </View>
                }
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
    ad: {
        width: '100%',
        maxHeight: 150
    },
    adImage: {
        width: '100%',
        height: '100%'
    }
});

export default ExpertContainer;