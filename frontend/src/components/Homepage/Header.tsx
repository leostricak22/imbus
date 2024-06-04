import {Image, Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from "react-native-svg";

const logoImage = require("../../../assets/icon.png");

import notification from "@/assets/icons/header/notification"
import AccountProfileImage from "../../../assets/icons/Account/AccountProfileImage";
import logoClient from "@/assets/icons/logoClient";
import logoExpert from "@/assets/icons/logoExpert";
import logoClientBold from "@/assets/icons/header/logoClientBold";
import logoExpertBold from "@/assets/icons/header/logoExpertBold";

export default function Header({navigation, userData}:any) {
    return (
        <View style={styles.header}>
            <Pressable style={styles.defaultUserProfileContainer} onPress={() => navigation.navigate("accountsettings")}>
                {
                    userData && userData.profileImage ? (
                        <Image source={{uri : `data:image/jpeg;base64,${userData && userData.profileImage}`}} style={styles.defaultUserProfileImage} />
                    ) : (
                        <View>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={AccountProfileImage}
                            />
                        </View>
                    )
                }
            </Pressable>
            <View style={styles.logoImage}>
                <SvgXml
                    width="75%"
                    height="75%"
                    xml={
                        userData.role === 'CLIENT' ? logoClientBold : logoExpertBold
                    }
                />
            </View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultUserProfileImage: {
        position: 'absolute',
        left: 0,
        width: 30,
        height: 30,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#000',
    },
    defaultUserProfileContainer: {
        position: 'absolute',
        left: 15,
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