import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

const AdSmallFixesDialog = ({ isVisible, onClose, onOption1Press, onOption2Press }:any) => {
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
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={
                                onOption1Press
                            }
                        >
                            <Text style={styles.optionText}>Oglas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={
                                onOption2Press
                            }
                        >
                            <Text style={styles.optionText}>Prijavi sitan kvar</Text>
                        </TouchableOpacity>
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
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
});

export default AdSmallFixesDialog;