import React, { useState, useRef, useEffect } from 'react';
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { button } from "@/src/styles/button";
import { colors } from "@/src/styles/colors";
import { SvgXml } from "react-native-svg";
import post_client_hover from "@/assets/icons/navigation/post_client_hover";
import post_client from "@/assets/icons/navigation/post_client";
import AdSmallFixesDialogProps, { DialogProps } from "@/src/types/DialogProps";
import add from "@/assets/icons/offer/add";
import remove from "@/assets/icons/offer/remove";
import {input} from "@/src/styles/input";

const ValueDialog: React.FC<DialogProps> = ({ isVisible, onClose, onOption1Press, onOption2Press, value, setValue }) => {
    const [hoverStates, setHoverStates] = useState({
        cancel: false,
        confirm: false,
    });

    const [showModal, setShowModal] = useState(isVisible);
    const [error, setError] = useState("");
    const slideAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            setShowModal(true);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 350,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                })
            ]).start(() => setShowModal(false));
        }
    }, [isVisible]);

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    const slideUp = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [350, 0],
    });

    useEffect(() => {
        if (isNaN(value))
            setValue(0);
    }, [value]);

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={showModal}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.centeredView}>
                    <Animated.View style={[styles.modalView, { transform: [{ translateY: slideUp }] }]}>
                        <View style={styles.value}>
                            <TouchableOpacity
                                style={styles.addToValue}
                                onPress={() => {
                                        setError("")
                                        if (value-50 < 0)
                                            setValue(0)
                                        else
                                            setValue(value-50)
                                    }
                                }
                            >
                                <SvgXml
                                    width="100%"
                                    height="100%"
                                    xml={remove}
                                />
                            </TouchableOpacity>
                            <>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={value.toString() + "€"}
                                    onChangeText={(text) => {
                                        const numericValue = parseInt(text);
                                        if (!isNaN(numericValue) && numericValue >= 0) {
                                            setValue(numericValue);
                                        }
                                    }}
                                />
                            </>
                            <TouchableOpacity
                                style={styles.addToValue}
                                onPress={() => {
                                        setError("")
                                        setValue(value+50)
                                    }
                                }
                            >
                                <SvgXml
                                    width="100%"
                                    height="100%"
                                    xml={add}
                                />
                            </TouchableOpacity>

                        </View>
                        {error && <Text style={styles.error}>{error}</Text> }
                        <View style={styles.options}>
                            <View style={styles.option}>
                                <Pressable
                                    style={[
                                        button.buttonContainer,
                                        hoverStates.cancel ? colors.backgroundDarkGray : colors.backgroundBlack
                                    ]}
                                    onPress={onOption1Press}
                                    onPressIn={() => setHoverState("cancel", true)}
                                    onPressOut={() => setHoverState("cancel", false)}
                                >
                                    <Text style={button.buttonText}>Odustani</Text>
                                </Pressable>
                            </View>
                            <View style={styles.option}>
                                <Pressable
                                    style={[
                                        button.buttonContainer,
                                        hoverStates.confirm ? colors.backgroundDarkOrange : colors.backgroundOrange
                                    ]}
                                    onPress={() => {
                                        if(value == 0) setError("Ponuda ne može biti 0!")
                                        else onOption2Press();
                                        }
                                    }
                                    onPressIn={() => setHoverState("confirm", true)}
                                    onPressOut={() => setHoverState("confirm", false)}
                                >
                                    <Text style={[button.buttonText, colors.black]}>Potvrdi</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        paddingTop: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    borderBlack: {
        borderColor: 'black',
        borderWidth: 1,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 15,
    },
    option: {
        width: '45%',
    },
    value: {
        flexDirection: 'row',
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    addToValue: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        ...input.input,
        width: 150,
        height: 70,
        textAlign: 'center',
        marginHorizontal: 30,
        fontSize: 45,
    },
    error: {
        color: 'red',
        alignSelf: 'center',
    },
});

export default ValueDialog;