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
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import ExpertContainerProps from "@/src/types/expert/ExpertContainerProps";
import {expertinfo} from "@/src/styles/expertinfo";
import build_expert from "@/assets/icons/info/build_expert";
import location_expert from "@/assets/icons/info/location_expert";

const ExpertInfo: React.FC<ExpertContainerProps> = ({ navigation , expert, role="CLIENT"}) => {
    const openUserPage = () => {
        navigation.navigate("user-page", {expert: expert});
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
                        <Text>4.6</Text>
                        <StarRating
                            rating={4.5}
                        />
                        <Text style={expertinfo.ratingCount}>(16)</Text>
                    </View>
                </View>
            </View>
            <View style={expertinfo.info}>
                <View style={expertinfo.categories}>
                    <View style={expertinfo.icon}>
                        <SvgXml xml={role == 'CLIENT' ? build : build_expert} width="100%" height="100%" />
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
                        <SvgXml xml={role == 'CLIENT' ? location : location_expert} width="100%" height="100%" />
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
});

export default ExpertInfo;