import {Image, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "../../../../../assets/icons/Account/AccountProfileImage";

export default function OfferContainer({offer}:any) {
    return (
        <View key={offer.id} style={styles.container}>
            <View style={styles.userInfo}>
                {
                    offer.user.profileImage ? (
                        <Image source={{uri: `data:image/jpeg;base64,${offer.user.profileImage}`}} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImage}>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={AccountProfileImage}
                            />
                        </View>
                    )
                }
                <Text style={styles.textTitle}>{offer.user.name} {offer.user.surname}</Text>
            </View>
            <Text>{offer.price} €</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
    },
    textTitle: {
        fontSize: 14,
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})