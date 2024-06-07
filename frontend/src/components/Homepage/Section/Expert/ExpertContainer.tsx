import {Image, Pressable, StyleSheet, Text, View} from "react-native";

import React from 'react';

import {categoryTypes} from "@/src/data/CategoryTypes";
import {counties} from "@/src/data/Counties";
import {SvgXml} from 'react-native-svg';
import AccountProfileImage from "../../../../../assets/icons/Account/AccountProfileImage";
import StarRating from "@/src/components/Rating/StarRating";
import facebook from "@/assets/icons/companies/facebook";
import build from "@/assets/icons/info/build";
import location from "@/assets/icons/info/location";

export default function ExpertContainer({expert}:any) {
    return (
        <Pressable style={styles.container}>
            <View style={styles.itemContainer}>
                {
                    expert.profileImage ? (
                        <Image source={{uri: `data:image/jpeg;base64,${expert.profileImage}`}} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImage}>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={AccountProfileImage}
                            />
                        </View>
                    )
                }

                <View>
                    <Text style={styles.textTitle}>{expert.name} {expert.surname}</Text>
                    <View style={styles.rating}>
                        <Text>4.6</Text>
                        <StarRating
                            rating={4.5}
                        />
                        <Text style={styles.ratingCount}>(16)</Text>
                    </View>
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.categories}>
                    <View style={styles.icon}>
                        <SvgXml xml={build} width="100%" height="100%" />
                    </View>
                    <View>
                        {expert.categories.map((category: React.Key | null | undefined) => (
                            <Text key={category} style={styles.textInfo}>
                                {categoryTypes.find(item => item.value === category)?.label ?? ''}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.location}>
                    <View style={styles.icon}>
                        <SvgXml xml={location} width="100%" height="100%" />
                    </View>
                    <View>
                        <Text style={styles.textInfo}>
                            {counties.find(item => item.value === expert.location)?.label ?? ''}
                        </Text>
                    </View>
                </View>

            </View>
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
        marginTop: 20,
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
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
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
        marginRight: 5,
    }
});