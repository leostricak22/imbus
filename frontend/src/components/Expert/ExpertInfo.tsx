import {Image, Pressable, StyleSheet, Text, View} from "react-native";

import React, {useEffect} from 'react';

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
import build_expert from "@/assets/icons/info/build_expert";
import location_expert from "@/assets/icons/info/location_expert";
import premium from "@/assets/icons/premium/premium";
import location_premium from "@/assets/icons/premium/location_premium";
import build_premium from "@/assets/icons/premium/build_premium";
import SOBOSLIKARSTVO_CLIENT from "@/assets/icons/expert/SOBOSLIKARSTVO_CLIENT";
import CISCENJE_CLIENT from "@/assets/icons/expert/CISCENJE_CLIENT";
import SOLARNI_PANELI_CLIENT from "@/assets/icons/expert/SOLARNI_PANELI_CLIENT";
import ELEKTROINSTALACIJE_CLIENT from "@/assets/icons/expert/ELEKTROINSTALACIJE_CLIENT";
import ARHITEKTURA_CLIENT from "@/assets/icons/expert/ARHITEKTURA_CLIENT";
import SOLARNI_PANELI_PREMIUM from "@/assets/icons/expert/SOLARNI_PANELI_PREMIUM";
import ELEKTROINSTALACIJE_PREMIUM from "@/assets/icons/expert/ELEKTROINSTALACIJE_PREMIUM";
import ARHITEKTURA_PREMIUM from "@/assets/icons/expert/ARHITEKTURA_PREMIUM";
import SOBOSLIKARSTVO_PREMIUM from "@/assets/icons/expert/SOBOSLIKARSTVO_PREMIUM";
import CISCENJE_PREMIUM from "@/assets/icons/expert/CISCENJE_PREMIUM";

const ExpertInfo: React.FC<ExpertContainerProps> = ({ navigation , expert, role="CLIENT", container=false }) => {
    const openUserPage = () => {
        navigation.navigate("user-page", {expert: expert});
    }

    function averageRating () {
        let sum = 0;
        console.log('ratingstest')
        console.log(expert)
        console.log(expert.ratings)

        if(expert.ratings == null)
            return (0).toFixed(1);

        expert.ratings.length > 0 &&
        expert.ratings.forEach((rating: { rating: number; }) => {
            sum += rating.rating;
        });

        if(sum==0)
            return (0).toFixed(1);

        return (sum / expert.ratings.length).toFixed(1);
    }


    return (
        <View style={styles.container}>
            <View style={expertinfo.itemContainer}>
                {
                    expert.profileImage ? (
                        <Image source={{uri: `data:image/jpeg;base64,${expert.profileImage}`}} style={expertinfo.profileImage} />
                    ) : (
                        <View style={expertinfo.profileImage}>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={AccountProfileImage}
                            />
                        </View>
                    )
                }
                <View>
                    <Text style={expertinfo.textTitle}>{expert.name} {expert.surname}</Text>
                    <View style={expertinfo.rating}>
                        {expert.ratings != null &&
                            <>
                                <Text>{averageRating()} </Text>
                                    <StarRating
                                        rating={parseFloat(averageRating())}
                                    />
                                    <Text style={expertinfo.ratingCount}>({expert.ratings.length})</Text>
                            </>
                        }
                    </View>
                </View>
                {
                    <View style={styles.iconBadge}>
                        <SvgXml
                            width="100%"
                            height="100%"
                            xml={
                                expert.premium ? (
                                    expert.categories[0] == 'SOBOSLIKARSTVO' ? SOBOSLIKARSTVO_PREMIUM :
                                    expert.categories[0] == 'ARHITEKTURA' ? ARHITEKTURA_PREMIUM :
                                    expert.categories[0] == 'ELEKTROINSTALACIJE' ? ELEKTROINSTALACIJE_PREMIUM :
                                    expert.categories[0] == 'SOLARNI_PANELI' ? SOLARNI_PANELI_PREMIUM :
                                    expert.categories[0] == 'CISCENJE' ? CISCENJE_PREMIUM : null
                                ) : (
                                    expert.categories[0] == 'SOBOSLIKARSTVO' ? SOBOSLIKARSTVO_CLIENT :
                                    expert.categories[0] == 'ARHITEKTURA' ? ARHITEKTURA_CLIENT :
                                    expert.categories[0] == 'ELEKTROINSTALACIJE' ? ELEKTROINSTALACIJE_CLIENT :
                                    expert.categories[0] == 'SOLARNI_PANELI' ? SOLARNI_PANELI_CLIENT :
                                    expert.categories[0] == 'CISCENJE' ? CISCENJE_CLIENT : null
                                )
                            }
                        />
                    </View>
                }
            </View>
            <View style={expertinfo.info}>
                <View style={expertinfo.categories}>
                    <View style={expertinfo.icon}>
                        <SvgXml xml={(expert.premium && container) ? build_premium : (role == 'CLIENT' ? build : build_expert)} width="100%" height="100%" />
                    </View>
                    <View>
                        {expert.categories.map((category: React.Key | null | undefined) => (
                            <Text key={category} style={expertinfo.textInfo}>
                                {categoryTypes.find(item => item.value === category)?.label ?? ''}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={expertinfo.location}>
                    <View style={expertinfo.icon}>
                        <SvgXml xml={(expert.premium && container) ? location_premium : (role == 'CLIENT' ? location : location_expert)} width="100%" height="100%" />
                    </View>
                    <View>
                        <Text style={expertinfo.textInfo}>
                            {counties.find(item => item.value === expert.location)?.label ?? ''}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    iconBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
    }
});

export default ExpertInfo;