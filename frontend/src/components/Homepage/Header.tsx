import {Image, Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from "react-native-svg";

import notification from "@/assets/icons/header/notification"
import AccountProfileImage from "../../../assets/icons/Account/AccountProfileImage";
import React from "react";
import UserContainerProps from "@/src/types/user/UserContainerProps";
import LogoUserImage from "@/src/components/Partials/LogoUserImage";

const Header: React.FC<UserContainerProps> = ({ navigation, userData}) => {
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
            <LogoUserImage userDataRole={userData.role}/>

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
    defaultUserProfileImage: {
        position: 'absolute',
        left: 0,
        width: 30,
        height: 30,
        borderRadius: 100,
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

export default Header;