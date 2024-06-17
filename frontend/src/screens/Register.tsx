import React, {useEffect, useState} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {View, Text, StyleSheet, ScrollView, Button, Pressable, Image} from "react-native";
import {SvgXml} from "react-native-svg";
import logo from "@/assets/icons/logo";
import DropdownInput from "@/src/components/InputTypes/DropdownInput";
import {counties} from "@/src/data/Counties";
import {roles} from "@/src/data/Roles";
import logoClient from "@/assets/icons/logoClient";
import logoExpert from "@/assets/icons/logoExpert";
import useKeyboard from "@/src/hooks/useKeyboard";

import {RegisterExpertForm} from "@/src/components/Account/RegisterExpertForm";

import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";
import {RegisterClientForm} from "@/src/components/Account/RegisterClientForm";
import {FormParameter} from "@/src/types/form/FormParameter";
import add_a_photo from "@/assets/icons/photo/add_a_photo";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import envVars from "@/src/utils/envVars";

export const Register: React.FC<NavigationParameter> = ({ navigation }) => {
    const [pickedRole, setPickedRole] = React.useState("");
    const [error, setError] = React.useState("");
    const [form, setForm] = React.useState({
        name: "",
        surname: "",
        username: "",
        role: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        category: [],
        profileImage: "",
    });

    const [hoverStates, setHoverStates] = useState({
        register: false,
    });


    const setHoverStateTrue = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: true }));
    }

    const setHoverStateFalse = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: false }));
    }

    const handleChange = (name: string, value: string) => {
        setForm({
            name: "",
            surname: "",
            username: "",
            role: "CLIENT",
            email: "",
            password: "",
            confirmPassword: "",
            location: "",
            category: [],
            profileImage: "",
        });
        console.log(pickedRole)
        setPickedRole(value);
    };

    const handleRegister = async () => {
        if (
            form.username === "" ||
            form.email === "" ||
            form.password === "" ||
            form.confirmPassword === "" ||
            form.name === "" ||
            form.location === "" ||
            form.surname === ""
        ) {
            setError("Molimo popunite sva polja.");
            return;
        }

        if(pickedRole == 'EXPERT' && form.category.length == 0) {
            setError("Molimo odaberite kategoriju.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Lozinke se ne podudaraju.");
            return;
        }

        console.log(form)

        try {
            const response = await fetch(`${envVars.API_ENDPOINT}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed. Please try again.");
            } else {
                await AsyncStorage.setItem("token", data.token);
                navigation.navigate("homepage");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error("Registration error:", error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled) {
            const base64Image = result.assets[0].base64;
            // @ts-ignore
            setForm({ ...form, profileImage: base64Image });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.logoImagesContainer}>
                    <View style={styles.logoImageContainer}>
                        <SvgXml
                            width="100%"
                            height="100%"
                            xml={pickedRole == 'CLIENT' ? logoClient : (pickedRole == 'EXPERT' ? logoExpert : logo)}
                        />
                    </View>
                </View>
                <View style={styles.rolePick}>
                    <DropdownInput handleChange={handleChange} items={roles} formData={{}} formDataItem={"location"}/>
                </View>

                <Pressable style={[styles.imagePickContainer, form.profileImage != "" ? {borderWidth: 0} : {borderWidth: 1}]}
                    onPress={pickImage}
                >
                    {
                        form.profileImage != "" ? (
                            <Image style={styles.profileImage} source={{ uri: `data:image/jpeg;base64,${form.profileImage}` }}/>
                        ) : (
                            <>
                                <View style={styles.addPhotoContainer}>
                                    <SvgXml width="100%" height="100%" xml={add_a_photo} />
                                </View>
                                <Text>Slika profila</Text>
                            </>
                        )
                    }
                </Pressable>

                <View style={styles.formContainer}>
                    {
                        pickedRole == 'CLIENT' ? (
                            <View style={styles.form}>
                                <RegisterClientForm form={form} setForm={setForm}/>
                                <Text style={styles.error}>{error}</Text>
                                <Pressable
                                    style={[button.buttonContainer, hoverStates.register ? colors.backgroundDarkBlue : colors.backgroundBlue]}
                                    onPress={handleRegister}
                                    onPressIn={() => setHoverStateTrue("register")}
                                    onPressOut={() => setHoverStateFalse("register")}
                                >
                                    <Text style={button.buttonText}>Registracija</Text>
                                </Pressable>
                            </View>
                        ) : pickedRole == 'EXPERT' ? (
                            <View style={styles.form}>
                                <RegisterExpertForm form={form} setForm={setForm}/>
                                <Text style={styles.error}>{error}</Text>
                                <Pressable
                                    style={[button.buttonContainer, hoverStates.register ? colors.backgroundDarkOrange : colors.backgroundOrange]}
                                    onPress={handleRegister}
                                    onPressIn={() => setHoverStateTrue("register")}
                                    onPressOut={() => setHoverStateFalse("register")}
                                >
                                    <Text style={button.buttonText}>Registracija</Text>
                                </Pressable>
                            </View>
                        ) : null
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    scrollView: {
        width: '100%',
    },
    logoImagesContainer: {
        width: '100%',
        marginTop: 40,
        marginBottom: 20,
    },
    logoImageContainer: {
        width: '100%',
        height: 70,
        marginBottom: 30,
    },
    rolePick: {
        width: '80%',
        margin: 'auto',
        marginBottom: 10,
    },
    formContainer: {
        width: '80%',
        margin: "auto",
        marginBottom: 20,
    },
    form: {
        width: '100%',
    },
    imagePickContainer: {
        width: 120,
        height: 120,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        marginBottom: 10,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhotoContainer: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        alignSelf: 'center',
    }
});