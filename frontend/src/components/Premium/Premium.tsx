import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
import Header from '../Partials/Header';
import userSessionData from "@/src/services/user/userSessionData";

// @ts-ignore
const Premium = ({navigation}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const [checkoutUrl, setCheckoutUrl] = useState(null);

    const {userData, dataLoading, refetchUserData} = userSessionData()

    const handleCheckout = async () => {
        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer sk_test_51PPyDsFfYcrcAYka7r0zo34WQrQFVcegPzGykH4PjEiSfs08dHXdAWIeCAoEhF1QKcT3QrEvo4RjpAqE9YzD3MJQ00l2tOlJzI`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'payment_method_types[]': 'card',
                'line_items[0][price_data][currency]': 'usd',
                'line_items[0][price_data][product_data][name]': 'Test Product',
                'line_items[0][price_data][unit_amount]': '2000',
                'line_items[0][quantity]': '1',
                'mode': 'payment',
                'success_url': 'yourapp://success',
                'cancel_url': 'yourapp://cancel'
            }).toString()
        });

        const session = await response.json();
        if (session.url) {
            setCheckoutUrl(session.url);
            // @ts-ignore
            WebBrowser.openBrowserAsync(session.url);
        } else {
            Alert.alert('Error', 'Failed to create checkout session');
        }
    };

    const handleOptionSelect = (option: string | React.SetStateAction<null>) => {
        // @ts-ignore
        setSelectedOption(option);
    };

    return (
        <View style={styles.container}>
            <Header userData={userData} navigation={navigation} />
            <View style={styles.secondContainer}>
                <View style={styles.textContainer}>
                    <Text style={[styles.secondText, styles.yellowSecondText, userData.role == 'CLIENT' && {color:"#0478ca"}]}>Premium plan</Text>
                    <Text style={styles.secondText}>
                        već od <Text style={[styles.yellowSecondText, userData.role == 'CLIENT' && {color:"#0478ca"}]}>8€/mj.</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.thirdContainer}>
                <View style={styles.innerThirdContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="check" size={35} color="green" />
                    </View>
                    <View>
                        <Text style={styles.thirdText}>Bez reklama</Text>
                    </View>
                </View>
                <View style={styles.innerThirdContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="check" size={35} color="green" />
                    </View>
                    <View>
                        <Text style={styles.thirdText}>Istaknuti profil</Text>
                    </View>
                    <View style={styles.helpContainer}>
                        <Icon name="question-circle" size={20} color="gray" />
                    </View>
                </View>
            </View>
            <View style={styles.fourthContainer}>
                <View style={styles.topHalfFourthContainer}></View>
                <View style={styles.bottomHalfFourthContainer}>
                    <TouchableOpacity style={styles.iconTextContainerFour} onPress={() => handleOptionSelect('1 month')}>
                        <Icon name={selectedOption === '1 month' ? 'check-circle' : 'circle'} size={20} color={selectedOption === '1 months' ? (userData.role == 'CLIENT' ? "#0478ca" : '#FFBF49') : (userData.role == 'CLIENT' ? "#0478ca" : '#FFBF49')} />
                        <Text style={styles.fourthText}>1 mjesec</Text><Text style={styles.priceText}>10€</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconTextContainerFour} onPress={() => handleOptionSelect('6 months')}>
                        <Icon name={selectedOption === '6 months' ? 'check-circle' : 'circle'} size={20} color={selectedOption === '6 months' ? (userData.role == 'CLIENT' ? "#0478ca" : '#FFBF49') : (userData.role == 'CLIENT' ? "#0478ca" : '#FFBF49')} />
                        <Text style={styles.fourthText}>6 mjeseci</Text><Text style={styles.fourthGrayText}>(9€/mj.)</Text><Text style={styles.priceText}>54€</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconTextContainerFour} onPress={() => handleOptionSelect('12 months')}>
                        <Icon name={selectedOption === '12 months' ? 'check-circle' : 'circle'} size={20} color={selectedOption === '12 months' ? (userData.role == 'CLIENT' ? "#0478ca" : '#FFBF49') : (userData.role == 'CLIENT' ? "#0478ca" : '#FFBF49')} />
                        <Text style={styles.fourthText}>12 mjeseci</Text><Text style={styles.fourthGrayText}>(8€/mj.)</Text><Text style={styles.priceText}>96€</Text>
                    </TouchableOpacity>
                </View>
            </View >
            <View style={styles.paymentButtonContainer}>
                <TouchableOpacity style={[styles.paymentButton, userData.role == 'CLIENT' && {backgroundColor:"#0478ca"}]} onPress={handleCheckout}>
                    <Text style={styles.paymentButtonText}>Plaćanje</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 50,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
    },
    secondContainer: {
        height: 180,
        padding: 10,

    },
    textContainer: {
        padding: 10,
    },
    secondText: {
        fontSize: 45
    },
    yellowSecondText: {
        color: '#FFBF49'
    },
    thirdContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 140,
    },
    innerThirdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    thirdText: {
        fontSize: 25,
        marginLeft: 20,
        marginTop: -12
    },
    iconContainer: {
        width: 35,
        height: 35,
        marginBottom: 10,
    },
    helpContainer: {
        width: 20,
        height: 20,
        marginBottom: 10,
        marginLeft: 10
    },
    fourthContainer: {
        flex: 1,
        paddingHorizontal: 10,

    },
    topHalfFourthContainer: {
        flex: 1,
    },
    bottomHalfFourthContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: 10,
        marginBottom: 30
    },
    fourthText: {

        fontSize: 25,
        marginLeft: 15,
        marginBottom: 3,

    },
    fourthGrayText: {
        fontSize: 25,
        marginLeft: 10,
        marginBottom: 3,
        color: 'gray',
    },
    priceText: {
        display: 'flex',
        fontSize: 25,
        textAlign: 'right',
    },
    iconTextContainerFour: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentButtonContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    paymentButton: {
        backgroundColor: '#FFBF49',
        padding: 10,
        borderRadius: 50,
        height: 48,
        alignItems: 'center',
    },
    paymentButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
});

export default Premium;