import React, { useState, useRef, useEffect } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { button } from "@/src/styles/button";
import { colors } from "@/src/styles/colors";
import { SvgXml } from "react-native-svg";
import post_client_hover from "@/assets/icons/navigation/post_client_hover";
import post_client from "@/assets/icons/navigation/post_client";
import AdSmallFixesDialogProps from "@/src/types/dialog/DialogProps";

const AdSmallFixesDialog: React.FC<AdSmallFixesDialogProps> = ({ isVisible, onClose, onOption1Press, onOption2Press }) => {
    const [hoverStates, setHoverStates] = useState({
        ad: false,
        smallFixes: false,
        cancel: false,
    });

    const [showModal, setShowModal] = useState(isVisible);
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
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                }),
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

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    });

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
                        <View style={styles.options}>
                            <View style={styles.option}>
                                <Pressable
                                    style={[
                                        button.buttonContainer,
                                        styles.borderBlack,
                                        hoverStates.smallFixes ? colors.backgroundGray : colors.backgroundWhite
                                    ]}
                                    onPress={onOption1Press}
                                    onPressIn={() => setHoverState("smallFixes", true)}
                                    onPressOut={() => setHoverState("smallFixes", false)}
                                >
                                    <Text style={[button.buttonText, colors.black]}>Sitan kvar</Text>
                                </Pressable>
                            </View>
                            <View style={styles.option}>
                                <Pressable
                                    style={[
                                        button.buttonContainer,
                                        hoverStates.ad ? colors.backgroundDarkBlue : colors.backgroundBlue
                                    ]}
                                    onPress={onOption2Press}
                                    onPressIn={() => setHoverState("ad", true)}
                                    onPressOut={() => setHoverState("ad", false)}
                                >
                                    <Text style={button.buttonText}>Novi oglas</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={onClose}
                            onPressIn={() => setHoverState("cancel", true)}
                            onPressOut={() => setHoverState("cancel", false)}
                        >
                            <Animated.View style={{ transform: [{ rotate }] }}>
                                <SvgXml
                                    width="45"
                                    height="45"
                                    xml={hoverStates.cancel ? post_client_hover : post_client}
                                />
                            </Animated.View>
                        </Pressable>
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
    },
    option: {
        width: '45%',
    },
    cancelButton: {
        marginTop: 15,
        paddingBottom: 10,
    },
});

export default AdSmallFixesDialog;