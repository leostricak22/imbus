import React from "react";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import {View, Text, StyleSheet} from "react-native";
import {SvgXml} from "react-native-svg";
import logo from "@/assets/icons/logo";
import DropdownInput from "@/src/components/InputTypes/DropdownInput";
import {counties} from "@/src/data/Counties";
import {roles} from "@/src/data/Roles";

export const Register: React.FC<NavigationParameter> = ({ navigation }) => {
    const [pickedRole, setPickedRole] = React.useState("");
    const handleChange = (name: string, value: string) => {
        setPickedRole(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoImagesContainer}>
                <View style={styles.logoImageContainer}>
                    <SvgXml
                        width="100%"
                        height="100%"
                        xml={logo}
                    />
                </View>
            </View>
            <View style={{width:'100%'}}>
                <DropdownInput handleChange={handleChange} items={roles} formData={{}}
                           formDataItem={"location"}/>
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
});