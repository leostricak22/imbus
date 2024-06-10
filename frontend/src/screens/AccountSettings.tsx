import { View, StyleSheet, Image, Button, Pressable, ScrollView, ActivityIndicator, Text } from "react-native";
import Header from "../components/Partials/Header";
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from "react";
import UserForm from "../components/Account/UserForm";

import updateUser from '../services/user/updateUser';
import userSessionData from "../services/user/userSessionData";
import {UserData} from "@expo/config/build/getUserState";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";

const defaultUserProfileImage = require("../../assets/icons/defaultUserProfile.png");
import {colors} from "@/src/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import envVars from "@/src/utils/envVars";

export const AccountSettings: React.FC<NavigationParameter> = ({ navigation }) => {
    const {userData, setUserData, dataLoading, refetchUserData } = userSessionData();
    const { updateUser:any, uploading, error } = updateUser({});

    const [hoverStates, setHoverStates] = useState({
        premium: false,
        referal: false,
        profile: false,
        settings: false,
        logout: false,
    });

    const setHoverState = (key: any, value: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    }

    const logout= async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('login');
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            const base64Image = result.assets[0].base64;
            // @ts-ignore
            setUserData({ ...userData, profileImage: base64Image });

            if (base64Image != null) {
                userData.attachment = base64Image;

                console.log(userData)

                const token = await AsyncStorage.getItem('token');
                try {
                    const response = await axios.put(`${envVars.API_ENDPOINT}/user/`, userData, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    return response.data;
                } catch (error) {
                    console.error(error);
                }

            }
        }
    };

    return (
        <View style={styles.containerBox}>
            <Header navigation={navigation} userData={userData} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={pickImage}>
                        <Image style={styles.profileImage} source={{ uri: `data:image/jpeg;base64,${userData.profileImage}` }}/>
                    </Pressable>
                    <Text style={styles.fullName}>{userData.name} {userData.surname}</Text>
                </View>
                <View style={styles.boxContainer}>
                    <Pressable style={[styles.box, styles.premiumBox, userData.role == 'CLIENT' ? {borderColor: "#0478ca"} : {borderColor: "#ffbf49"}, hoverStates.premium && colors.backgroundGray]}
                               onPress={() => navigation.navigate('premium')}
                               onPressIn={() => setHoverState("premium", true)}
                               onPressOut={() => setHoverState("premium", false)}
                    >
                        <Text style={[styles.boxText, styles.premiumText, userData.role == 'CLIENT' ? colors.blue : colors.orange]}>Premium</Text>
                        <Text style={[styles.boxText, styles.premiumText, userData.role == 'CLIENT' ? colors.blue : colors.orange]}>plan</Text>
                    </Pressable>
                    <Pressable style={[styles.box, hoverStates.referal && colors.backgroundGray]}
                               onPressIn={() => setHoverState("referal", true)}
                               onPressOut={() => setHoverState("referal", false)}
                    >
                        <Text style={styles.boxText}>Pozovi</Text>
                        <Text style={styles.boxText}>prijatelja</Text>
                    </Pressable>
                </View>
                <View style={styles.rectangleContainer}>
                    <Pressable style={[styles.rectangle, hoverStates.profile && colors.backgroundGray]}
                               onPressIn={() => setHoverState("profile", true)}
                               onPressOut={() => setHoverState("profile", false)}
                    >
                        <Text style={styles.rectangleText}>Moj profil</Text>
                    </Pressable>
                    <Pressable style={[styles.rectangle, hoverStates.settings && colors.backgroundGray]}
                               onPressIn={() => setHoverState("settings", true)}
                               onPressOut={() => setHoverState("settings", false)}
                    >
                        <Text style={styles.rectangleText}>Postavke</Text>
                    </Pressable>
                    <Pressable style={[styles.rectangle, hoverStates.logout && colors.backgroundGray]}
                               onPress={logout}
                               onPressIn={() => setHoverState("logout", true)}
                               onPressOut={() => setHoverState("logout", false)}
                    >
                        <Text style={styles.rectangleText}>Odjava</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerBox: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    header: {
        alignItems: 'center',
    },
    profileImage: {
        width: 141,
        height: 141,
        borderRadius: 100,
        backgroundColor: '#cccccc',
        marginBottom: 10,
    },
    fullName: {
        fontSize: 24,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 20,
    },
    box: {
        width: '48%',
        height: 88,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        fontWeight: 'bold',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.78,
        elevation: 15
    },
    premiumText: {

        color: '#FFBF49',
    },
    premiumBox: {
        borderColor: '#FFBF49',
    },

    boxText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    rectangleContainer: {
        alignItems: 'center',
        width: '100%'
    },
    rectangle: {
        width: '90%',
        height: 44,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.78,
        elevation: 15
    },
    rectangleText: {
        fontSize: 20,
    },
});
