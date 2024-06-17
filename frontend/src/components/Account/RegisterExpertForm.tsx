import React, {useEffect, useState} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {View, Text, StyleSheet, TextInput, Pressable} from "react-native";
import {SvgXml} from "react-native-svg";
import mail from "@/assets/icons/login/mail";
import accountProfileImage from "@/assets/icons/Account/AccountProfileImage";
import lock from "@/assets/icons/login/lock";
import visibility from "@/assets/icons/login/visibility";

import {input} from "@/src/styles/input";
import DropdownInput from "@/src/components/InputTypes/DropdownInput";
import {roles} from "@/src/data/Roles";
import {counties} from "@/src/data/Counties";
import {categoryTypes} from "@/src/data/CategoryTypes";
import {FormParameter} from "@/src/types/form/FormParameter";
import build from "@/assets/icons/dropdown/build";
import location from "@/assets/icons/dropdown/location";

export const RegisterExpertForm: React.FC<FormParameter> = ({ form, setForm }) => {
    const [isPasswordHidden1, setIsPasswordHidden1] = useState(true);
    const [isPasswordHidden2, setIsPasswordHidden2] = useState(true);
    const [pickedLocation, setPickedLocation] = React.useState("");
    const [pickedCategory, setPickedCategory] = React.useState("");

    const handleChange = (inputTag: string, value: string) => {
        setForm((prevForm: any) => ({ ...prevForm, [inputTag]: value }));
    };

    const handleChangeLocation = (name: string, value: string) => {
        setPickedLocation(value);
        setForm({ ...form, location: value });
    };

    const handleChangeCategory = (name: string, value: string) => {
        setPickedCategory(value);

        let tempCategory = [];
        tempCategory?.push(value)

        setForm({ ...form, category: tempCategory });
    };

    useEffect(() => {
        console.log(form)
    }, [form]);

    return (
        <View style={styles.container}>
            <View style={styles.dropdownForm}>
                <DropdownInput handleChange={handleChangeCategory} items={categoryTypes} formData={{}} formDataItem={"categories"} icon={build}/>
            </View>
            <View style={styles.dropdownForm}>
                <DropdownInput handleChange={handleChangeLocation} items={counties} formData={{}} formDataItem={"location"} icon={location}/>
            </View>

            <View style={input.inputContainer}>
                <View style={input.inputIcon}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={accountProfileImage}
                    />
                </View>
                <TextInput
                    style={input.input}
                    placeholder="Korisničko ime"
                    onChangeText={(text) => handleChange("username", text)}
                />
            </View>
            <View style={styles.nameSurnameContainer}>
                <View style={[input.inputContainer, {width: "48%"}]}>
                    <TextInput
                        style={[input.input, {paddingLeft: 10}]}
                        placeholder="Ime"
                        onChangeText={(text) => handleChange("name", text)}
                    />
                </View>
                <View style={[input.inputContainer, {width: "48%"}]}>
                    <TextInput
                        style={[input.input, {paddingLeft: 10}]}
                        placeholder="Prezime"
                        onChangeText={(text) => handleChange("surname", text)}
                    />
                </View>
            </View>
            <View style={input.inputContainer}>
                <View style={input.inputIcon}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={mail}
                    />
                </View>
                <TextInput
                    style={input.input}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => handleChange("email", text)}
                />
            </View>
            <View style={input.inputContainer}>
                <View style={input.inputIcon}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={lock}
                    />
                </View>
                <TextInput
                    style={input.inputShowHide}
                    placeholder="Lozinka"
                    secureTextEntry={isPasswordHidden1}
                    onChangeText={(text) => handleChange("password", text)}
                />

                <Pressable style={input.inputIcon}
                           onPress={() => setIsPasswordHidden1(!isPasswordHidden1)}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={visibility}
                    />
                </Pressable>
            </View>
            <View style={input.inputContainer}>
                <View style={input.inputIcon}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={lock}
                    />
                </View>
                <TextInput
                    style={input.inputShowHide}
                    placeholder="Potvrda lozinke"
                    secureTextEntry={isPasswordHidden2}
                    onChangeText={(text) => handleChange("confirmPassword", text)}
                />
                <Pressable style={input.inputIcon}
                           onPress={() => setIsPasswordHidden2(!isPasswordHidden2)}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={visibility}
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    dropdownForm: {
        width: '100%',
        marginBottom: 10,
    },
    nameSurnameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});