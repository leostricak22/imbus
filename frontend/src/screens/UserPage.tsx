import React, {useState} from "react";
import ExpertContainerProps from "@/src/types/expert/ExpertContainerProps";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {View, Text, StyleSheet, Pressable} from "react-native";
import ExpertInfo from "@/src/components/Expert/ExpertInfo";
import Header from "@/src/components/Partials/Header";
import userSessionData from "@/src/services/user/userSessionData";
import RatingsContainer from "@/src/components/Ratings/RatingsContainer";
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";

const UserPage: React.FC<NavigationParameter> = ({ navigation, route}) => {
    const { expert } = route.params;

    const [hoverStates, setHoverStates] = useState({
        chat: false,
    });

    const {userData, dataLoading, refetchUserData} = userSessionData()

    const setHoverStateTrue = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: true }));
    }

    const setHoverStateFalse = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: false }));
    }

    return (
        <View style={styles.container}>
            {userData && <Header navigation={navigation} role={userData.role} />}
            <View style={styles.infoContainer}>
                <View style={styles.expertInfoContainer}>
                    <ExpertInfo navigation={navigation} expert={expert} role={userData.role}/>
                </View>
                <View style={styles.description}>
                    <Text>Završio sam srednju školu za električara. Već 30 godina radim u struci. Imam jako puno iskustva. Ne postoji kvar sa strujom koji ne mogu popraviti. Slobodno mi se obratite sa povjerenjem.</Text>
                </View>
                <RatingsContainer navigation={navigation} expert={expert} role={userData.role}/>
            </View>
            <View style={styles.messageContainer}>
                <Pressable
                    style={[button.buttonContainer, hoverStates.chat ? (userData.role == 'EXPERT' ? colors.backgroundDarkOrange : colors.backgroundDarkBlue) : (userData.role == 'EXPERT' ? colors.backgroundOrange : colors.backgroundBlue)]}
                    onPressIn={() => setHoverStateTrue("chat")}
                    onPressOut={() => setHoverStateFalse("chat")}
                >
                    <Text style={button.buttonText}>Poruka</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    infoContainer: {
        padding: 10,
    },
    expertInfoContainer: {
    },
    description: {
        marginVertical: 10,
    },
    messageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 70,
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
})

export default UserPage;