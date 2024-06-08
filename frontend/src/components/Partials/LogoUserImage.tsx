import { StyleSheet, View} from 'react-native';
import {SvgXml} from "react-native-svg";

import logoClientBold from "@/assets/icons/header/logoClientBold";
import logoExpertBold from "@/assets/icons/header/logoExpertBold";
import React from "react";

const LogoUserImage: React.FC<any> = ({ userDataRole }) => {
    return (
        <View style={styles.logoImage}>
            <SvgXml
                width="75%"
                height="75%"
                xml={
                    userDataRole === 'CLIENT' ? logoClientBold : logoExpertBold
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logoImage: {
        width: 60,
        height: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LogoUserImage;