import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "../../../../../assets/icons/Account/AccountProfileImage";
import PhotoSlider from "../../../Ad/PhotoSlider";
// @ts-ignore
import location from "../../../../../assets/icons/location.png";
import {counties} from "@/src/data/Counties";
import Calendar from "../../../../svg/Calendar";
import getOffers from "../../../../services/getOffers";
import {useEffect, useState} from "react";
import OfferContainer from "./OfferContainer";

export default function AdContainer({ad, navigation}:any) {
    let allOfferData: any, dataLoading: any, refetchAllOfferData: any;
    ({allOfferData, dataLoading, refetchAllOfferData} = allOfferData(ad.id));
    const [parentWidth, setParentWidth] = useState(0);
    const [images, setImages] = useState([]);

    function formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        return `${day}.${month}.`;
    }

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    useEffect(() => {
        setImages(ad.attachments.map((attachment: any) => (
            `data:image/jpeg;base64,${attachment}`
        )));
    }, []);

    return (
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
                        <SvgXml
                            width="15"
                            height="15"
                            xml={Calendar}
                        />
                        <View>
                            <Text style={styles.textInfo}>
                                {formatDate(ad.do_the_job_from)} - {formatDate(ad.do_the_job_to)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.textWithIcon}>
                        <Image source={location} style={{width: 15, height: 15, marginTop: 2}}/>
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
                <Text>Ponude</Text>
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
            <View style={styles.options}>
                <Pressable style={[styles.option, styles.backgroundBlack]}>
                    <Text style={styles.white}>Poruka</Text>
                </Pressable>
                <Pressable style={[styles.option, styles.backgroundOrange]}>
                    <Text style={styles.white}>Ponuda</Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
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
        marginBottom: 5,
        width: '100%',
        maxHeight: 70,
        backgroundColor: '#c9e0ee',
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
    }
})