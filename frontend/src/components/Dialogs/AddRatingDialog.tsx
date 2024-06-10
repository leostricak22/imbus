import React, {useEffect, useState} from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback } from 'react-native';
import StarRating from '@/src/components/Ratings/StarRating';
import ExpertContainerProps from "@/src/types/expert/ExpertContainerProps";
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import envVars from "@/src/utils/envVars";
import RatingDialogProps from "@/src/types/RatingDialogProps";

const AddRatingDialog: React.FC<RatingDialogProps> = ({ visible, onClose, onSave, role,expert }) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [errorText, setErrorText] = useState('');

    const [hoverStates, setHoverStates] = useState({
        save: false,
    });

    const setHoverState = (key: any, value: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    }

    const handleSave = async () => {
        if(rating == 0) {
            setErrorText('Morate odabrati ocjenu!');
            return;
        }

        let ratingObject = {
            rating: rating,
            description: description,
            userRated: expert,
        };

        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`${envVars.API_ENDPOINT}/ratings/`, ratingObject, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 409) {
            } else {
                console.error('Error sending message', error);
            }
        }

        setRating(0);
        setDescription('');
        onClose();
    };

    useEffect(() => {
        setErrorText('');
    }, [rating]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Dodaj recenziju</Text>
                            <View style={styles.starRatingContainer}>
                                <StarRating rating={rating} onRatingChange={setRating} starSize={40} />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Dodajte opis..."
                                value={description}
                                onChangeText={setDescription}
                                multiline
                            />
                            <View style={styles.buttonContainer}>
                                <Text style={{ color: 'red', marginBottom: 10 }}>{errorText}</Text>
                                <Pressable
                                    style={[button.buttonContainer, colors.backgroundGray, (hoverStates.save ? (role == "CLIENT" ? colors.backgroundDarkBlue : colors.backgroundDarkOrange) : (role == "CLIENT" ? colors.backgroundBlue : colors.backgroundOrange))]}
                                    onPress={handleSave}
                                    onPressIn={() => setHoverState("save", true)}
                                    onPressOut={() => setHoverState("save", false)}
                                >
                                    <Text style={button.buttonText}>Potvrdi</Text>
                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
        height: 120,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        fontSize: 16,
        backgroundColor: 'white',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    starRatingContainer: {
        marginBottom: 20,
    }
});

export default AddRatingDialog;
