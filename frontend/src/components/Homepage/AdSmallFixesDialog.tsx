import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";

const AdSmallFixesDialog = ({ isVisible, onClose, onOption1Press, onOption2Press }:any) => {
    const [hoverStates, setHoverStates] = useState({
        ad: false,
        smallFixes: false,
    });

    const setHoverStateTrue = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: true }));
    }

    const setHoverStateFalse = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: false }));
    }

    return (
        isVisible &&
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.options}>
                            <Pressable
                                style={[button.buttonContainer, styles.borderBlack, hoverStates.smallFixes ? colors.backgroundGray : colors.backgroundWhite]}
                                onPress={
                                    onOption1Press
                                }
                                onPressIn={() => setHoverStateTrue("smallFixes")}
                                onPressOut={() => setHoverStateFalse("smallFixes")}
                            >
                                <Text style={[button.buttonText, colors.black]}>Sitan kvar</Text>
                            </Pressable>

                            <Pressable
                                style={[button.buttonContainer, hoverStates.ad ? colors.backgroundDarkBlue : colors.backgroundBlue]}
                                onPress={
                                    onOption1Press
                                }
                                onPressIn={() => setHoverStateTrue("ad")}
                                onPressOut={() => setHoverStateFalse("ad")}
                            >
                                <Text style={button.buttonText}>Novi oglas</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openModalButton: {
        fontSize: 20,
        color: 'blue',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 35,
        alignItems: 'center',
        elevation: 5,

    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    optionButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        width: 200,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        color: 'white',
    },
    borderBlack: {
        borderColor: 'black',
        borderWidth: 1,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});

export default AdSmallFixesDialog;