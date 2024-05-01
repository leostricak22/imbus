import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import AdSmallFixesDialog from "./AdSmallFixesDialog";
import AccountProfileImage from "../../svg/AccountProfileImage";
import {SvgUri, SvgXml} from "react-native-svg";
import HomepageIcon from "../../svg/HomepageIcon";

import AdIcon from "../../svg/AdIcon";
import SmallFixesIcon from "../../svg/SmallFixesIcon";
import ChatIcon from "../../svg/ChatIcon";
import ExpertIcon from "../../svg/ExpertIcon";

const homepageImage = require("../../../assets/icons/homepage/homepage.png");
const homepageSelectedImage = require("../../../assets/icons/homepage/homepageSelected.png");

const postsImage = require("../../../assets/icons/homepage/posts.png");
const postsSelectedImage = require("../../../assets/icons/homepage/postsSelected.png");

const messagesImage = require("../../../assets/icons/homepage/messages.png");
const messagesSelectedImage = require("../../../assets/icons/homepage/messagesSelected.png");

const specialistsImage = require("../../../assets/icons/homepage/specialists.png");
const specialistsSelectedImage = require("../../../assets/icons/homepage/specialistsSelected.png");

export default function Navigation({ navigation, selectedSection, setSelectedSection, userData} ) {
    const [buttonAddIsHovered, setButtonAddIsHovered] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [themeColor, setThemeColor] = useState("#209cee");
    const [themeColorDark, setThemeColorDark] = useState("#085e96");

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleAddAdPress = () => {
        navigation.navigate("add-ad")
        hideDialog();
    };

    const handleOption2Press = () => {
        // Do something for Option 2
        hideDialog();
    };

    useEffect(() => {
        if(userData && userData.role === 'EXPERT') {
            setThemeColor("#cc9403");
            setThemeColorDark("#7c5a02");
        } else {
            setThemeColor("#209cee");
            setThemeColorDark("#085e96");
        }
    }, [selectedSection]);

    return (
        <View style={styles.navigation}>
            <View style={styles.container}>
                <Pressable style={styles.section} onPress={() => {setSelectedSection(0);}}>
                    <SvgXml
                        width="30"
                        height="20"
                        xml={HomepageIcon}
                        fill={
                            selectedSection === 0 ? themeColor : "#000"
                        }
                    />
                    <Text style={[styles.sectionText, selectedSection === 0 ? {color: themeColor} : styles.black]}>Naslovnica</Text>
                </Pressable>

                <Pressable style={styles.section} onPress={() => {setSelectedSection(1);}}>
                    <SvgXml
                        width="30"
                        height="20"
                        xml={SmallFixesIcon}
                        fill={
                            selectedSection === 1 ? themeColor : "#000"
                        }
                    />
                    <Text style={[styles.sectionText, selectedSection === 1 ? {color: themeColor} : styles.black]}>Objave</Text>
                </Pressable>

                { (userData && userData.role === 'CLIENT') ? (
                    <Pressable style={[styles.circleButton, buttonAddIsHovered ? {backgroundColor: themeColorDark} : {backgroundColor: themeColor}]}
                               onPressIn={() => setButtonAddIsHovered(true)}
                               onPressOut={() => setButtonAddIsHovered(false)}
                               onPress={showDialog}
                    >
                        <View style={styles.plusLineHorizontal} />
                        <View style={styles.plusLineVertical} />
                    </Pressable>
                ) : (
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(5);}}>
                        <SvgXml
                            width="30"
                            xml={AdIcon}
                            fill={
                                selectedSection === 5 ? themeColor : "#000"
                            }
                        />
                        <Text style={[styles.sectionText, selectedSection === 5 ? {color: themeColor} : styles.black]}>Oglasi</Text>
                    </Pressable>
                )}

                <Pressable style={styles.section} onPress={() => {setSelectedSection(2);}}>
                    <SvgXml
                        width="30"
                        height="20"
                        xml={ChatIcon}
                        fill={
                            selectedSection === 2 ? themeColor : "#000"
                        }
                    />
                    <Text style={[styles.sectionText, selectedSection === 2 ? {color: themeColor} : styles.black]}>Poruke</Text>
                </Pressable>

                <Pressable style={styles.section} onPress={() => {setSelectedSection(3);}}>
                    <SvgXml
                        width="30"
                        height="20"
                        xml={ExpertIcon}
                        fill={
                            selectedSection === 3 ? themeColor : "#000"
                        }
                    />
                    <Text style={[styles.sectionText, selectedSection === 3 ? {color: themeColor} : styles.black]}>Znalci</Text>
                </Pressable>
            </View>
            <AdSmallFixesDialog
                isVisible={dialogVisible}
                onClose={hideDialog}
                onOption1Press={handleAddAdPress}
                onOption2Press={handleOption2Press}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#afaeae',
        padding: 10,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        zIndex: 1,
    },
    circleButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        bottom: 10,
        borderColor: 'white',
        borderWidth: 4,
    },
    plusLineHorizontal: {
        position: 'absolute',
        width: 30,
        height: 4,
        backgroundColor: 'white',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -2 }],
    },
    plusLineVertical: {
        position: 'absolute',
        width: 4,
        height: 30,
        backgroundColor: 'white',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -2 }, { translateY: -15 }],        
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '20%',
    },
    sectionImage: {
        width: 50,
        height: 50,
    },
    sectionText: {
        marginTop: 5,
        fontSize: 12,
    },
    blue: {
        color:"#209cee",
    },
    gray: {
        color: "#b3b3b3",
    },
    black: {
        color: "#000",
    },
    backgroundBlue: {
        backgroundColor: '#209cee',
    },
    backgroundYellow: {
        backgroundColor: '#cc9403',
    },
    backgroundDarkBlue: {
        backgroundColor: '#085e96',
    },
    backgroundDarkYellow: {
        backgroundColor: '#7c5a02',
    },
});