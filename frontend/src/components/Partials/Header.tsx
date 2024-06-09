import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from "react";
import UserContainerProps from "@/src/types/user/UserContainerProps";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import LogoUserImage from "@/src/components/Partials/LogoUserImage";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "@/assets/icons/Account/AccountProfileImage";
import arrow_back from "@/assets/icons/header/arrow_back";
import notification from "@/assets/icons/header/notification";

const logoImage = require("../../../assets/icon.png");
const backIconImage = require("../../../assets/icons/back.png");

const Header: React.FC<UserContainerProps> = ({ navigation, userData}) => {
    return (
        <View style={styles.header}>
            <Pressable style={styles.backIconContainer} onPress={() => navigation.goBack()}>
                <SvgXml
                    width="100%"
                    height="100%"
                    xml={arrow_back}
                />
            </Pressable>
            <LogoUserImage userDataRole={userData.role} />
            <View style={styles.notification}>
                <SvgXml
                    width="100%"
                    height="100%"
                    xml={notification}
                />
            </View>
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
        padding: 5,
        width: 30,
        height: 30,
    },
    notification: {
        position: 'absolute',
        right: 15,
        width: 25,
        height: 25,
    },
});

export default Header;