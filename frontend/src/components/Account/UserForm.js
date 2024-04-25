import React, {useEffect, useState} from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function UserForm({name, setName, surname, setSurname, username, setUsername, email, setEmail, password, setPassword, role, setRole, location, setLocation, categories, setCategories}) {
    return (
        <View style={styles.container}>
            <View style={styles.formSection}>
                <Text style={styles.label}>Ime</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Ime"
                />
            </View>

            <View style={styles.formSection}>
                <Text style={styles.label}>Surname</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setSurname}
                    value={surname}
                    placeholder="Prezime"
                />
            </View>

            <View style={styles.formSection}>
                <Text style={styles.label}>Korisničko ime</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Korisničko ime"
                    editable={false}
                />
            </View>

            <View style={styles.formSection}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                />
            </View>

            <View style={styles.formSection}>
                <Text style={styles.label}>Lozinka</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Lozinka"
                    secureTextEntry={true}
                />
            </View>

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