import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import AdSmallFixesDialog from "../Dialogs/AdSmallFixesDialog";
import {SvgXml} from "react-native-svg";

import home from "@/assets/icons/navigation/home"
import home_client from "@/assets/icons/navigation/home_client"
import home_expert from "@/assets/icons/navigation/home_expert"

import small_fixes from "@/assets/icons/navigation/small_fixes"
import small_fixes_client from "@/assets/icons/navigation/small_fixes_client"
import small_fixes_expert from "@/assets/icons/navigation/small_fixes_expert"

import chat from "@/assets/icons/navigation/chat"
import chat_client from "@/assets/icons/navigation/chat_client"
import chat_expert from "@/assets/icons/navigation/chat_expert"

import ads from "@/assets/icons/navigation/ads"
import ads_expert from "@/assets/icons/navigation/ads_expert"

import expert from "@/assets/icons/navigation/expert"
import expert_client from "@/assets/icons/navigation/expert_client"

import calendar from "@/assets/icons/navigation/calendar";
import calendar_expert from "@/assets/icons/navigation/calendar_expert";

import post_client from "@/assets/icons/navigation/post_client";
import post_client_hover from "@/assets/icons/navigation/post_client_hover";

import {button} from "@/src/styles/button";
import new_chat_expert from "@/assets/icons/navigation/new_chat_expert";
import {newExpression} from "@babel/types";
import new_chat_client from "@/assets/icons/navigation/new_chat_client";

export default function Navigation({ navigation, selectedSection, setSelectedSection, userData, newMessages}:any ) {
    const [buttonAddIsHovered, setButtonAddIsHovered] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [role, setRole] = useState("")
    const [themeColor, setThemeColor] = useState("#0478ca");
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

    const handleSmallFixesPress = () => {
        navigation.navigate("add-small-fixes")
        hideDialog();
    };

    const setThemeAndRole = () => {
        if(userData && userData.role === 'EXPERT') {
            setRole('EXPERT')
            setThemeColor("#cc9403");
            setThemeColorDark("#7c5a02");
        } else if (userData && userData.role === 'CLIENT'){
            setRole('CLIENT')
            setThemeColor("#0478ca");
            setThemeColorDark("#085e96");
        }
    }

    useEffect(() => {
        setThemeAndRole();
    }, [selectedSection]);

    useEffect(() => {
        setThemeAndRole();
    }, [userData]);

    return (
        <View style={styles.navigation}>
            <View style={styles.container}>
                <Pressable style={styles.section} onPress={() => {setSelectedSection(0);}}>
                    <SvgXml
                        width="25"
                        height="25"
                        xml={
                            selectedSection === 0 && role === 'CLIENT' ? (
                                home_client
                            ) : selectedSection === 0 && role === 'EXPERT' ? (
                                home_expert
                            ) : (
                                home
                            )
                        }
                    />
                    <Text style={[styles.sectionText, selectedSection === 0 ? {color: themeColor} : styles.black]}>Naslovnica</Text>
                </Pressable>

                <Pressable style={styles.section} onPress={() => {setSelectedSection(1);}}>
                    <SvgXml
                        width="25"
                        height="25"
                        xml={
                            selectedSection === 1 && role === 'CLIENT' ? (
                                small_fixes_client
                            ) : selectedSection === 1 && role === 'EXPERT' ? (
                                small_fixes_expert
                            ) : (
                                small_fixes
                            )
                        }
                    />
                    <Text style={[styles.sectionText, selectedSection === 1 ? {color: themeColor} : styles.black]}>Objave</Text>
                </Pressable>

                { (userData && userData.role === 'CLIENT') ? (
                    <Pressable style={styles.circleButton}
                               onPressIn={() => setButtonAddIsHovered(true)}
                               onPressOut={() => setButtonAddIsHovered(false)}
                               onPress={showDialog}
                    >
                        <SvgXml
                            width="45"
                            height="45"
                            xml={buttonAddIsHovered ? post_client_hover : post_client}
                        />
                    </Pressable>
                ) : (
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(5);}}>
                        <SvgXml
                            width="25"
                            height="25"
                            xml={
                                selectedSection === 5 && role === 'EXPERT' ? (
                                    ads_expert
                                ) : (
                                    ads
                                )
                            }
                        />
                        <Text style={[styles.sectionText, selectedSection === 5 ? {color: themeColor} : styles.black]}>Oglasi</Text>
                    </Pressable>
                )}

                <Pressable style={styles.section} onPress={() => {setSelectedSection(2);}}>
                    <SvgXml
                        width="25"
                        height="25"
                        xml={
                            selectedSection === 2 && role === 'CLIENT' ? (
                                chat_client
                            ) : selectedSection === 2 && role === 'EXPERT' ? (
                                chat_expert
                            ) : (
                                !newMessages ? chat : (role === 'EXPERT' ? new_chat_expert : new_chat_client)
                            )
                        }
                    />
                    <Text style={[styles.sectionText, selectedSection === 2 ? {color: themeColor} : styles.black]}>Poruke</Text>
                </Pressable>

                { (userData && userData.role === 'CLIENT') ? (
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(3);}}>
                        <SvgXml
                            width="25"
                            height="25"
                            xml={
                                selectedSection === 3 && role === 'CLIENT' ? (
                                    expert_client
                                ) : (
                                    expert
                                )
                            }
                            fill={
                                selectedSection === 3 ? themeColor : "#000"
                            }
                        />
                        <Text style={[styles.sectionText, selectedSection === 3 ? {color: themeColor} : styles.black]}>Znalci</Text>
                    </Pressable>
                ) : (
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(4);}}>
                        <SvgXml
                            width="25"
                            height="25"
                            xml={
                                selectedSection === 4 && role === 'EXPERT' ? (
                                    calendar_expert
                                ) : (
                                    calendar
                                )
                            }
                            fill={
                                selectedSection === 4 ? themeColor : "#000"
                            }
                        />
                        <Text style={[styles.sectionText, selectedSection === 4 ? {color: themeColor} : styles.black]}>Kalendar</Text>
                    </Pressable>
                    )
                }
            </View>
            <AdSmallFixesDialog
                isVisible={dialogVisible}
                onClose={hideDialog}
                onOption1Press={handleSmallFixesPress}
                onOption2Press={handleAddAdPress}
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
        height: '100%',
        flex: 1,
        alignItems: 'center'
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
        color:"#0478ca",
    },
    gray: {
        color: "#b3b3b3",
    },
    black: {
        color: "#000",
    },
    backgroundBlue: {
        backgroundColor: '#0478ca',
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