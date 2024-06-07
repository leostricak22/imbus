import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from "react";
import UserContainerProps from "@/src/types/UserContainerProps";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import LogoUserImage from "@/src/components/Partials/LogoUserImage";

const logoImage = require("../../../assets/icon.png");
const backIconImage = require("../../../assets/icons/back.png");

const Header: React.FC<UserContainerProps> = ({ navigation, userData}) => {
    return (
        <View style={styles.header}>
            <Pressable style={styles.backIconContainer} onPress={() => navigation.goBack()}>
                <Image source={backIconImage} style={styles.backIconImage} />
            </Pressable>
            <LogoUserImage userDataRole={userData.role} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#dce3de',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logoImage: {
        width: 60,
        height: 60,
    },
    backIconImage: {
        position: 'absolute',
        left: 0,
        width: 20,
        height: 20,
    },
    backIconContainer: {
        position: 'absolute',
        left: 15,
        width: 30,
        height: 30,
    },
});

export default Header;