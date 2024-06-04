import {Image, Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "../../../assets/icons/AccountProfileImage";

const logoImage = require("../../../assets/icon.png");
const notificationImage = require("../../../assets/icons/notification.png");
const defaultUserProfileImage = require("../../../assets/icons/defaultUserProfile.png");

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
            <Image source={logoImage} style={styles.logoImage} />
            <Image source={notificationImage} style={styles.notification} />
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