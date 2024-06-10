import
{ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "../../../assets/icons/Account/AccountProfileImage";
import React, {useEffect, useState} from "react";
import SmallFixesContainerProps from "@/src/types/smallFixes/SmallFixesContainerProps";
import {timeAgo} from "@/src/utils/dateFormat";
import PhotoSlider from "@/src/components/Ad/PhotoSlider";
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";

const SmallFixesContainer: React.FC<SmallFixesContainerProps> = ({ smallFixes, navigation, refreshing, role="EXPERT" }) => {
    const [parentWidth, setParentWidth] = useState(0);
    const [images, setImages] = useState([]);
    const [hoverStates, setHoverStates] = useState({
        comment: false,
        share: false,
    });

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };


    useEffect(() => {
        setImages(smallFixes.attachments.map((attachment: any) => (
            `data:image/jpeg;base64,${attachment}`
        )));
    }, []);

    const smallFixesCreatedAt = smallFixes.created_at ? new Date(smallFixes.created_at) : null;
    let timeAgoString:string = "";
    if (smallFixesCreatedAt) {
        timeAgoString = timeAgo(smallFixesCreatedAt);
    }

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    return (
        <Pressable key={smallFixes.creator.id}  style={styles.container}>
            <View style={styles.userInfo}>
                {
                    smallFixes.creator.profileImage ? (
                        <Image source={{uri: `data:image/jpeg;base64,${smallFixes.creator.profileImage}`}} style={styles.profileImage} />
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
                    <Text style={styles.textTitle}>{smallFixes.creator.name} {smallFixes.creator.surname}</Text>
                    <Text style={styles.uploadedDate}>
                        {
                            timeAgoString
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.smallFixesContainer}>
                <Text>{smallFixes.description}</Text>
                <View style={styles.gallery} onLayout={onLayout}>
                    <PhotoSlider images={
                        images
                    } parentWidth={parentWidth} />
                </View>
                <View style={styles.commentContainer}>
                    <Text style={styles.commentText}>Komentara: {0}</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <Pressable
                        style={[button.buttonContainer, styles.option, colors.backgroundGray, (hoverStates.comment ? (role == "CLIENT" ? colors.backgroundDarkOrange : colors.backgroundDarkOrange) : (role == "CLIENT" ? colors.backgroundBlue : colors.backgroundOrange))]}
                        onPressIn={() => setHoverState("comment", true)}
                        onPressOut={() => setHoverState("comment", false)}
                    >
                        <Text style={button.buttonText}>Komentiraj</Text>
                    </Pressable>
                    <Pressable
                        style={[button.buttonContainer, styles.option, colors.backgroundWhite, {borderWidth: 1, borderColor:"black"}, (hoverStates.share && colors.backgroundGray)]}
                        onPressIn={() => setHoverState("share", true)}
                        onPressOut={() => setHoverState("share", false)}
                    >
                        <Text style={[button.buttonText, {color:"black"}]}>Podijeli</Text>
                    </Pressable>

                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 25,
        padding: 15,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 8
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
    smallFixesContainer: {
        marginTop: 10,
    },
    gallery: {
        flex: 1,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 5,
    },
    commentContainer: {
        width: '100%',
        textAlign: 'right',
    },
    commentText: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'right',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
    },
});

export default SmallFixesContainer;
