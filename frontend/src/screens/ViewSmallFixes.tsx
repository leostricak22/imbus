import React, {useState} from "react";
import ViewSmallFixesProps from "@/src/types/smallFixes/ViewSmallFixesProps";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {View, Text, StyleSheet, Image, ScrollView, RefreshControl, Pressable} from "react-native";
import Header from "@/src/components/Partials/Header";
import SmallFixesDetails from "@/src/components/SmallFixes/SmallFixesDetails";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "@/assets/icons/Account/AccountProfileImage";
import {timeAgo} from "@/src/utils/dateFormat";
import CommentSection from "@/src/components/SmallFixes/CommentSection";
import share from "@/assets/icons/smallfixes/share";

export const ViewSmallFixes: React.FC<NavigationParameter> = ({ navigation, route }) => {
    const { smallFixesForm, images, role } = route.params;
    const [refreshing, setRefreshing] = useState(false);

    const smallFixesCreatedAt = smallFixesForm.created_at ? new Date(smallFixesForm.created_at) : null;
    let timeAgoString:string = "";
    if (smallFixesCreatedAt) {
        timeAgoString = timeAgo(smallFixesCreatedAt);
    }

    const onRefresh = async () => {
        setRefreshing(true);
    };

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Header navigation={navigation} role={role}/>
            <View style={styles.smallFixesContainer}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        {
                            smallFixesForm.creator.profileImage ? (
                                <Image source={{uri: `data:image/jpeg;base64,${smallFixesForm.creator.profileImage}`}} style={styles.profileImage} />
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
                        <View>
                            <Text style={styles.textTitle}>{smallFixesForm.creator.name} {smallFixesForm.creator.surname}</Text>
                            <Text style={styles.uploadedDate}>
                                {
                                    timeAgoString
                                }
                            </Text>
                        </View>
                    </View>
                    <Pressable style={styles.shareContainer}>
                        <SvgXml
                            width="100%"
                            height="100%"
                            xml={share}
                        />
                    </Pressable>
                </View>
                <SmallFixesDetails smallFixesForm={smallFixesForm} role={role} navigation={navigation} images={images} />
                <CommentSection role={role} navigation={navigation} smallFixesId={smallFixesForm.id} refreshing={refreshing} setRefreshing={setRefreshing}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,

    },
    textTitle: {
        fontSize: 20,
        marginBottom: 5,
    },
    uploadedDate: {
        fontSize: 14,
        color: 'gray',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        marginRight: 10,
    },
    smallFixesContainer: {
        marginVertical: 10,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareContainer: {
        width: 25,
        height: 25,
        marginRight: 25,
        marginBottom: 15,
    },
});

export default ViewSmallFixes;