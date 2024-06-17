import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import ExpertContainerProps from "@/src/types/expert/ExpertContainerProps";
import { colors } from "@/src/styles/colors";
import AddRatingDialog from "@/src/components/Dialogs/AddRatingDialog";
import getRatings from "@/src/services/ratings/getRatings";
import StarRating from "@/src/components/Ratings/StarRating";
import premium from "@/assets/icons/premium/premium";

const RatingsContainer: React.FC<ExpertContainerProps> = ({ navigation, expert, role="CLIENT" }) => {
    const [hoverStates, setHoverStates] = useState({
        rating: false,
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { ratings, refetchRatingsData} = getRatings(expert);

    const setHoverState = (key: any, value: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    const addRating = () => {
        setIsModalVisible(true);
    };

    const handleSaveRating = (rating: any, description: any) => {
        console.log(rating, description)
    };

    return (
        <View style={styles.container}>
            <View style={styles.ratingHeader}>
                <Text style={styles.header}>Recenzije:</Text>
                <Pressable
                    style={[styles.addRating, (role == 'CLIENT' ? (!hoverStates.rating ? colors.backgroundBlue : colors.backgroundDarkBlue) : (!hoverStates.rating ? colors.backgroundOrange : colors.backgroundDarkOrange))]}
                    onPress={addRating}
                    onPressIn={() => setHoverState("rating", true)}
                    onPressOut={() => setHoverState("rating", false)}
                >
                    <Text style={[colors.white]}>Dodaj recenziju</Text>
                </Pressable>
            </View>
            <ScrollView style={styles.ratingContainer}>
                {
                    ratings.length > 0 ? (
                        ratings.map((rating: any, index: number) => (
                            <View key={index} style={styles.rating}>
                                <View style={styles.ratingHeader}>
                                    <View style={styles.userDetails}>
                                        <Image source={{uri: `data:image/jpeg;base64,${rating.userRating.profileImage}}`}} style={styles.profileImage} />
                                        <Text style={styles.userName}>{rating.userRating.name} {rating.userRating.surname}</Text>
                                    </View>
                                    <View style={styles.ratingStarsContainer}>

                                        <StarRating
                                            rating={rating.rating}
                                        />
                                    </View>
                                </View>
                                <Text>{rating.description}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.smallText}>Nema recenzija!</Text>
                    )
                }
            </ScrollView>
            <AddRatingDialog
                visible={isModalVisible}
                onClose={() => {
                    setIsModalVisible(false)
                    refetchRatingsData()
                }}
                onSave={handleSaveRating}
                role={role}
                expert={expert}
            />
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
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
    ratingHeader: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addRating: {
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden',
    },
    ratingStarsContainer: {
        width: 100,
        height: 40,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        marginLeft: 10,
        fontSize: 16,
    },
    rating: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    }
});

export default RatingsContainer;
