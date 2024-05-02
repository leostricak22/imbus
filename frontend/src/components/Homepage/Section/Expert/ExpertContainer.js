import {Image, StyleSheet, Text, View} from "react-native";
import StarRating from 'react-native-star-rating';

import React from 'react';

import {categoryTypes} from "../../../../data/CategoryTypes";
import {counties} from "../../../../data/Counties";
import { SvgXml } from 'react-native-svg';
import AccountProfileImage from "../../../../svg/AccountProfileImage";

const frenchKeyIcon = require("../../../../../assets/icons/french-key.png");
const location = require("../../../../../assets/icons/location.png");

export default function ExpertContainer({expert}) {
    return (
        <View key={expert.id} style={styles.itemContainer}>
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
                    <Text style={styles.text}>4,6</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={4.6}
                        starSize={12}
                        fullStarColor={'black'}
                        emptyStarColor={'black'}
                    />
                </View>
                <View style={styles.expertInfo}>
                    <View style={styles.categories}>
                        <Image source={frenchKeyIcon} style={{width: 15, height: 15, marginTop: 2}}/>
                        <View>
                            {expert.categories.map(category => (
                                <Text key={category} style={styles.textInfo}>
                                    {categoryTypes.find(item => item.value === category).label}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.location}>
                        <Image source={location} style={{width: 15, height: 15, marginTop: 2}}/>
                        <View>
                            <Text style={styles.textInfo}>
                                {counties.find(item => item.value === expert.location).label}
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 5,
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 5,
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
        spaceBetween: 5,
        marginTop: 10,
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        spaceBetween: 5,
        marginTop: 5,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInfo: {
        marginLeft: 5,
    }
});