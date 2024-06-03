import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {UserData} from "@expo/config/build/getUserState";

export default function UserForm({name, setName, surname, setSurname, username, setUsername, email, setEmail, password, setPassword, role, setRole, location, setLocation, categories, setCategories}:any) {
    return (
        <View style={styles.container}>
            <View style={styles.formSection}>
                <Text>Ime</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Ime"
                />
            </View>

            <View style={styles.formSection}>
                <Text>Surname</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setSurname}
                    value={surname}
                    placeholder="Prezime"
                />
            </View>

            <View style={styles.formSection}>
                <Text>Korisničko ime</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Korisničko ime"
                    editable={false}
                />
            </View>

            <View style={styles.formSection}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                />
            </View>

            {/*
            <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select Role" value="" />
                <Picker.Item label="Admin" value="Admin" />
                <Picker.Item label="User" value="User" />
            </Picker>
            <Picker
                selectedValue={location}
                onValueChange={(itemValue) => setLocation(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select Location" value="" />
            </Picker>
            */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 40,
    },
    input: {
        width: "100%",
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    formSection: {
        alignSelf: "center",
        width: "80%",
    },
});