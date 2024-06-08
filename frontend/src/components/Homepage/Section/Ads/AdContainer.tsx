import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "../../../../../assets/icons/Account/AccountProfileImage";
import PhotoSlider from "../../../Ad/PhotoSlider";
import {counties} from "@/src/data/Counties";
import Calendar from "../../../../svg/Calendar";
import getOffers from "../../../../services/getOffers";
import React, {useEffect, useState} from "react";
import OfferContainer from "./OfferContainer";
import getAds from "@/src/services/getAds";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import {ViewAdProps} from "@/src/types/ViewAdProps";
import AdContainerProps from "@/src/types/AdContainerProps";
import calendar_client from "@/assets/icons/navigation/calendar_client";
import calendar_expert from "@/assets/icons/navigation/calendar_expert";
import location from "@/assets/icons/info/location";
import location_expert from "@/assets/icons/info/location_expert";
import { colors } from "@/src/styles/colors";
import AdSmallFixesDialog from "@/src/components/Dialogs/AdSmallFixesDialog";
import OfferDialog from "@/src/components/Dialogs/OfferDialog";
import addAd from "@/src/services/addAd";
import addOffer from "@/src/services/addOffer";

const AdContainer: React.FC<AdContainerProps> = ({ ad, navigation, refreshing }) => {
    const {allOfferData, dataLoading, refetchAllOfferData} = getOffers(ad.id);

    const [parentWidth, setParentWidth] = useState(0);
    const [images, setImages] = useState([]);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [offer, setOffer] = useState(0);

    const { publishOffer, uploading, error } = addOffer({} as AddOfferProps);

    const [publishingOffer, setPublishingOffer] = useState(false);

    const [hoverStates, setHoverStates] = useState({
        chat: false,
        offer: false,
    });

    useEffect(() => {
        refetchAllOfferData();
    }, [refreshing]);

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    function formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        return `${day}.${month}.`;
    }

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    useEffect(() => {
        setImages(ad.attachments.map((attachment: any) => (
            `data:image/jpeg;base64,${attachment}`
        )));
    }, []);

    const handleSubmit = async () => {
        const requestData = {
            "adId": ad.id,
            "price": offer,
        };

        try {
            setPublishingOffer(true);
            await publishOffer(requestData);
            setPublishingOffer(false);
            if(!error) navigation.navigate("view-ad", {"ad":ad});
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable key={ad.creator.id} style={styles.itemContainer} onPress={() => navigation.navigate("view-ad", {"ad":ad})}>
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
                <View style={styles.adInfo}>
                    <View style={styles.adInfoText}>
                        <ScrollView style={styles.description} nestedScrollEnabled={true}><Text>{ad.description}</Text></ScrollView>

                        <View style={styles.textWithIcon}>
                            <View style={styles.icon}>
                                <SvgXml xml={calendar_expert} width="100%" height="100%"/>
                            </View>
                            <View>
                                <Text style={styles.textInfo}>
                                    {formatDate(ad.do_the_job_from)} - {formatDate(ad.do_the_job_to)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.textWithIcon}>
                            <View style={styles.icon}>
                                <SvgXml xml={location_expert} width="100%" height="100%"/>
                            </View>
                            <View>
                                <Text style={styles.textInfo}>
                                    {counties.find(item => item.value === ad.location)?.label ?? ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.gallery} onLayout={onLayout}>
                        <PhotoSlider images={
                            images
                        } parentWidth={parentWidth} />
                    </View>
                </View>
                <View>
                    <Text style={styles.heading}>Ponude</Text>
                    {
                        dataLoading || !allOfferData ? (
                            <Text style={styles.noOffers}>Loading</Text>
                        ) : allOfferData.length === 0 ? (
                            <Text style={styles.noOffers}>Nema ponuda.</Text>
                        ) : (
                            <>
                                {allOfferData.map((offer: any) => (
                                    <OfferContainer offer={offer} />
                                ))}
                            </>
                        )
                    }
                </View>
            </Pressable>
            <View style={styles.options}>
                <Pressable style={[styles.option, styles.borderLeftBottom, hoverStates.chat ? colors.backgroundDarkGray : colors.backgroundBlack ]}
                           onPressIn={() => setHoverState("chat", true)}
                           onPressOut={() => setHoverState("chat", false)}
                >
                    <Text style={styles.white}>Poruka</Text>
                </Pressable>
                <Pressable style={[styles.option, styles.borderRightBottom, hoverStates.offer ? colors.backgroundDarkOrange : colors.backgroundOrange ]}
                           onPress={showDialog}
                           onPressIn={() => setHoverState("offer", true)}
                           onPressOut={() => setHoverState("offer", false)}
                >
                    <Text style={styles.black}>Ponuda</Text>
                </Pressable>
            </View>
            <OfferDialog
                isVisible={dialogVisible}
                onClose={hideDialog}
                onOption1Press={hideDialog}
                onOption2Press={handleSubmit}
                value={offer}
                setValue={setOffer}
            />
            {
                publishingOffer &&
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopEndRadius: 15,
        borderWidth: 1,
        width: '100%',
        borderColor: '#ffbf49',
        alignSelf: 'center',
        borderBottomWidth: 0,
        marginTop: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
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
        marginBottom: 5,
        width: '100%',
        maxHeight: 70,
    },
    adInfoText: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
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

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    option: {
        backgroundColor: '#0478ca',
        padding: 10,
        width: '50%',
    },
    borderLeftBottom : {
        borderBottomLeftRadius: 15,
    },
    borderRightBottom : {
        borderBottomRightRadius: 15,
    },
    white: {
        color: 'white',
        textAlign: 'center',
    },
    black: {
        color: 'black',
        textAlign: 'center',
    },
    backgroundBlack: {
        backgroundColor: '#000',
    },
    backgroundOrange: {
        backgroundColor: '#ffbf49',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    }
})

export default AdContainer;