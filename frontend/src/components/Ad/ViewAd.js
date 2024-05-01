import AdContainer from "../Homepage/Section/Ads/AdContainer";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import Header from "../Partials/Header";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "../../svg/AccountProfileImage";
import Calendar from "../../svg/Calendar";
import location from "../../../assets/icons/location.png";
import {counties} from "../../data/Counties";
import PhotoSlider from "./PhotoSlider";
import OfferContainer from "../Homepage/Section/Ads/OfferContainer";
import useAllOfferData from "../../hooks/useAllOfferData";

export default function ViewAd({navigation, route}) {
    const { ad } = route.params;

    const { allOfferData, dataLoading, refetchAllOfferData } = useAllOfferData(ad.id);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        return `${day}.${month}.`;
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView style={styles.itemContainer}>
                <View style={styles.userInfo}>
                    {
                        ad.creator.profileImage ? (
                            <Image source={{uri: `data:image/jpeg;base64,${ad.creator.profileImage}`}} style={styles.profileImage} />
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
                        <Text style={styles.textTitle}>{ad.creator.name} {ad.creator.surname}</Text>
                        <Text style={styles.uploadedDate}>2h</Text>
                    </View>
                </View>

                <PhotoSlider images={["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg", "https://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg"]} />
                <Text style={styles.description}>{ad.description}</Text>

                <View style={styles.adInfoText}>
                    <View style={styles.textWithIcon}>
                        <SvgXml
                            width="25"
                            height="25"
                            xml={Calendar}
                        />
                        <View>
                            <Text style={styles.textInfo}>
                                {formatDate(ad.do_the_job_from)} - {formatDate(ad.do_the_job_to)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.textWithIcon}>
                        <Image source={location} style={{width: 25, height: 25, marginTop: 2}}/>
                        <View>
                            <Text style={styles.textInfo}>
                                {counties.find(item => item.value === ad.location).label}
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={styles.offers}>
                    <Text style={styles.textTitle}>Ponude</Text>
                    {
                        dataLoading || !allOfferData ? (
                            <Text style={styles.noOffers}>Loading</Text>
                        ) : allOfferData.length === 0 ? (
                            <Text style={styles.noOffers}>Nema ponuda.</Text>
                        ) : (
                            <>
                                {allOfferData.map(offer => (
                                    <OfferContainer offer={offer} />
                                ))}
                            </>
                        )
                    }
                </View>
                <View style={styles.options}>
                    <Pressable style={[styles.option, styles.backgroundBlack]}>
                        <Text style={styles.white}>Poruka</Text>
                    </Pressable>
                    <Pressable style={[styles.option, styles.backgroundOrange]}>
                        <Text style={styles.white}>Ponuda</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        width: '100%',
        alignSelf: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        margin: 15,
        marginRight: 10,
    },
    textTitle: {
        fontSize: 20,
        marginBottom: 5,
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadedDate: {
        fontSize: 14,
        color: 'gray',
    },
    gallery: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'lightgray',
        marginLeft: 5,
        maxHeight: 150,
    },
    adInfo: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: 150,
    },
    description: {
        fontSize: 14,
        padding: 15,
        marginBottom: 5,
        width: '100%',
    },
    adInfoText: {
        display: 'flex',
        flexDirection: 'column',
        margin: 15,
        marginTop: 0,
    },
    textWithIcon: {
        display: 'flex',
        flexDirection: 'row',
        spaceBetween: 5,
        marginTop: 5,
    },
    textInfo: {
        marginLeft: 5,
    },
    noOffers: {
        marginTop: 10,
        textAlign: 'center',
        color: 'gray',
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        marginTop: 10,
    },
    option: {
        backgroundColor: '#209cee',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    white: {
        color: 'white',
        textAlign: 'center',
    },
    backgroundBlack: {
        backgroundColor: '#000',
    },
    backgroundOrange: {
        backgroundColor: '#ffbf49',
    },
    offers: {
        margin: 15,
    }
})