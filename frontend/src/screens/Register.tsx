import React, {useEffect, useState} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {View, Text, StyleSheet, ScrollView, Button, Pressable} from "react-native";
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

export const Register: React.FC<NavigationParameter> = ({ navigation }) => {
    const [pickedRole, setPickedRole] = React.useState("");
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        category: "",
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
            email: "",
            password: "",
            confirmPassword: "",
            location: "",
            category: "",
        });
        setPickedRole(value);
    };

    const handleRegister = async () => {
        console.log("Registering...");
    }

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

                <View style={styles.formContainer}>
                    {
                        pickedRole == 'CLIENT' ? (
                            <View style={styles.form}>
                                <RegisterClientForm form={form} setForm={setForm}/>
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
    }
});