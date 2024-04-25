import { View, StyleSheet, Image, Button, Pressable, ScrollView, ActivityIndicator, Text } from "react-native";
import Header from "../Partials/Header";
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";

import useUpdateUser from '../../hooks/useUpdateUser';
import useUserSessionData from "../../hooks/useUserSessionData";

const defaultUserProfileImage = require("../../../assets/icons/defaultUserProfile.png");

export default function AccountSettings({ navigation }) {
    const [image, setImage] = useState(null);
    const {userData, setUserData, dataLoading, refetchUserData } = useUserSessionData()
    const { updateUser, uploading, error } = useUpdateUser(refetchUserData, userData);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [categories, setCategories] = useState([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.2,
        });

        if (!result.canceled)
            setImage(result.assets[0].uri);
    };

    const handleSubmit = async () => {
        if (!image) {
            console.log("No image selected");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'profileImage.jpg'
            });

            const user = {
                name: name,
                surname: surname,
                username: username,
                email: email,
                password: password,
                role: role,
                location: location,
                categories: categories
            }

            formData.append("user", JSON.stringify(user));

            console.log('Uploading image:', formData)

            await updateUser(formData);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    useEffect(() => {
        if (!userData) return;

        setName(userData.name);
        setSurname(userData.surname);
        setUsername(userData.username);
        setEmail(userData.email);
        setPassword(userData.password);
        setRole(userData.role);
        setLocation(userData.location);
        setCategories(userData.categories);

        setImage(`data:image/jpeg;base64,${userData.profileImage}`);
    }, [dataLoading, userData]);

    return (
        <View style={styles.container}>
            <Header navigation={navigation}></Header>
            {(!userData) && <ActivityIndicator style={styles.loaderFull} size="large" color="#209cee" />}
            <ScrollView style={styles.scrollContainer}>
                {uploading && <ActivityIndicator style={styles.loader} size="large" color="#209cee" />}
                <View style={styles.profilePicture}>
                    <Pressable style={styles.profilePictureImage} onPress={pickImage}>
                        {image ? <Image source={{ uri: image }} style={styles.image} />
                            : <Image source={defaultUserProfileImage} style={styles.image} />}
                    </Pressable>
                </View>
                <UserForm
                    name={name} setName={setName}
                    surname={surname} setSurname={setSurname}
                    username={username} setUsername={setUsername}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    role={role} setRole={setRole}
                    categories={categories} setCategories={setCategories}
                    location={location} setLocation={setLocation}
                />
                {error && <Text>Error: {error.message}</Text>}
                <Button title="Submit" onPress={handleSubmit} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    image: {
        width: 200,
        height: 200,
    },
    profilePicture: {
        alignItems: 'center',
        marginTop: 30,
    },
    profilePictureImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#000',
    },
    loader: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderFull: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: "#f5f5f5",
        paddingBottom: 50
    }
});