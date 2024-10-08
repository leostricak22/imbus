import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import Header from "../components/Partials/Header";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "../../assets/icons/Account/AccountProfileImage";
import Calendar from "../svg/Calendar";
// @ts-ignore
import location from "../../assets/icons/location.png";
import {counties} from "../data/Counties";
import PhotoSlider from "../components/Ad/PhotoSlider";
import OfferContainer from "../components/Ad/OfferContainer";
import getOffers from "../services/offer/getOffers";
import React, {useEffect, useState} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import UserData from "@/src/interface/UserData";
import AdFormStep4 from "@/src/components/Ad/Form/AdFormStep4";
import AdDetails from "@/src/components/Ad/AdDetails";
import {timeAgo} from "@/src/utils/dateFormat";
import userSessionData from "@/src/services/user/userSessionData";
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";

export const ViewAd: React.FC<NavigationParameter> = ({ navigation, route}) => {
    const { ad } = route.params;

    const {allOfferData, dataLoading, refetchAllOfferData} = getOffers(ad.id);
    const [images, setImages] = useState([]);

    const {userData, setUserData, dataLoading:dataLoadingSession, refetchUserData } = userSessionData();

    const [offerSet, setOfferSet] = useState(true);

    const [hoverStates, setHoverStates] = useState({
        chat: false,
        offer: false,
    });

    function formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        return `${day}.${month}.`;
    }

    useEffect(() => {
        // @ts-ignore
        setImages(ad.attachments.map(attachment => (
            `data:image/jpeg;base64,${attachment}`
        )));
    }, []);

    useEffect(() => {
        setOfferSet(true);
        if(allOfferData.length > 0) {
            for(let i =0;i<allOfferData.length;i++) {
                // @ts-ignore
                if(allOfferData[i].user.id === userData.id) {
                    setOfferSet(false);
                }
            }
        }
    }, [allOfferData]);

    const adCreatedAt = ad.created_at ? new Date(ad.created_at) : null;
    let timeAgoString:string = "";
    if (adCreatedAt) {
        timeAgoString = timeAgo(adCreatedAt);
    }

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} role={userData.role} />
            <ScrollView style={[styles.itemContainer, userData && userData.role === "CLIENT" && {marginBottom:0}]}>
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
                        <Text style={styles.uploadedDate}>{timeAgoString}</Text>
                    </View>
                </View>

                <View style={styles.form}>
                    <AdDetails navigation={navigation} adForm={ad} images={images} role={userData && userData.role} />
                </View>

                <View style={styles.offers}>
                    <Text style={styles.textTitle}>Ponude:</Text>
                    {
                        dataLoading || !allOfferData ? (
                            <Text style={styles.noOffers}>Loading</Text>
                        ) : allOfferData.length === 0 ? (
                            <Text style={styles.noOffers}>Nema ponuda.</Text>
                        ) : (
                            <>
                                {allOfferData.map((offer: any) => (
                                    <Pressable onPress={() => navigation.navigate("user-page", {expert:offer.user})}
                                               key={offer.id}
                                    >
                                        <OfferContainer offer={offer} />
                                    </Pressable>
                                ))}
                            </>
                        )
                    }
                </View>
            </ScrollView>
            {
                userData && userData.role !== "CLIENT" && (
                    <View style={styles.options}>
                        <Pressable
                            style={[
                                button.buttonContainer,
                                styles.option,
                                !offerSet && {width: "100%"},
                                hoverStates.chat ? colors.backgroundDarkGray : colors.backgroundBlack
                            ]}
                            onPressIn={() => setHoverState("chat", true)}
                            onPressOut={() => setHoverState("chat", false)}
                        >
                            <Text style={button.buttonText}>Poruka</Text>
                        </Pressable>

                        {
                            offerSet &&
                            <Pressable
                                style={[
                                    button.buttonContainer,
                                    styles.option,
                                    hoverStates.offer ? colors.backgroundDarkOrange : colors.backgroundOrange
                                ]}
                                onPressIn={() => setHoverState("offer", true)}
                                onPressOut={() => setHoverState("offer", false)}
                            >
                                <Text style={[button.buttonText, colors.black]}>Ponuda</Text>
                            </Pressable>
                        }
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 70,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        margin: 10,
        marginRight: 10,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
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
        paddingVertical: 10,
        paddingHorizontal: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5.84,
        elevation: 15,
        backgroundColor: 'white',

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',

    },
    option: {
        width: '48%',
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
    },
    form : {
    }
})