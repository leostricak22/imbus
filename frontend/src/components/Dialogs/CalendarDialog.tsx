import React, {useEffect, useRef, useState} from 'react';
import {Modal, View, Text, Pressable, StyleSheet, Animated, TouchableWithoutFeedback} from 'react-native';
import DateTimeInput from "@/src/components/InputTypes/DateTimeInput";
import CalendarDialogProps from "@/src/types/calendar/CalendarDialogProps";
import DropdownInput from "@/src/components/InputTypes/DropdownInput";
import {categoryTypes} from "@/src/data/CategoryTypes";
import schedule from "@/assets/icons/calendar/schedule";
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";
import {SvgXml} from "react-native-svg";
import post_client_hover from "@/assets/icons/navigation/post_client_hover";
import post_client from "@/assets/icons/navigation/post_client";
import post_expert_hover from "@/assets/icons/navigation/post_expert_hover";
import post_expert from "@/assets/icons/navigation/post_expert";
import Message from "@/src/interface/Message";
import useSendMessageSuggestion from "@/src/services/chat/useSendMessageSuggestion";

export const CalendarDialog: React.FC<CalendarDialogProps> = ({ modalVisible, closeCalendar, role, otherUser }) => {
    const { form, setForm, confirm, loading, error } = useSendMessageSuggestion(otherUser);
    const [errorText, setErrorText] = useState<string>("");

    const [showModal, setShowModal] = useState(modalVisible);

    const [hoverStates, setHoverStates] = useState({
        confirm: false,
        cancel: false,
    });

    const slideAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (modalVisible) {
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
    }, [modalVisible]);

    const slideUp = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [350, 0],
    });

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    });


    function handleChangeTime(name: string, value: string) {
        setForm({ ...form, time: value });
        setErrorText("")
    }

    useEffect(() => {
        setErrorText("")
    }, [form.date]);

    const time = Array.from({ length: 24 }, (_, i) => i).map((hour) => {
        return {label: `${hour}:00`, value: hour};
    });

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    }

    function handleSubmit() {
        console.log(form.date, form.time)
        if(!form.date || form.date === "" || !form.time || form.time === "") {
            setErrorText("Odaberite datum i vrijeme!");
            return;
        }

        confirm();
        closeCalendar();
    }

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={showModal}
            onRequestClose={closeCalendar}
        >
            <TouchableWithoutFeedback onPress={closeCalendar}>
                <View style={styles.modalBackground}>
                    <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideUp }] }]}>
                        <DateTimeInput form={form} setForm={setForm} formDataItem={"date"} />
                        <View style={styles.dropdownForm}>
                            <DropdownInput handleChange={handleChangeTime} items={time} formData={form} formDataItem={"time"} icon={schedule}/>
                        </View>

                        <Text style={styles.error}>{errorText}</Text>

                        <Pressable
                            style={[button.buttonContainer, colors.backgroundGray, (hoverStates.confirm ? (role == "CLIENT" ? colors.backgroundDarkBlue : colors.backgroundDarkOrange) : (role == "CLIENT" ? colors.backgroundBlue : colors.backgroundOrange))]}
                            onPress={handleSubmit}
                            onPressIn={() => setHoverState("confirm", true)}
                            onPressOut={() => setHoverState("confirm", false)}
                        >
                            <Text style={button.buttonText}>Potvrdi</Text>
                        </Pressable>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={closeCalendar}
                            onPressIn={() => setHoverState("cancel", true)}
                            onPressOut={() => setHoverState("cancel", false)}
                        >
                            <Animated.View style={{ transform: [{ rotate }] }}>
                                <SvgXml
                                    width="45"
                                    height="45"
                                    xml={hoverStates.cancel ? (role === 'CLIENT' ? post_client_hover : post_expert_hover) : (role === 'CLIENT' ? post_client : post_expert)}
                                />
                            </Animated.View>
                        </Pressable>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'column',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity:  0.19,
        shadowRadius: 5.62,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderBottomWidth: 0,
    },
    dropdownForm: {
        width: '100%',
        height: 55,
        marginBottom: 10,
    },
    cancelButton: {
        marginTop: 15,
        paddingBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    }
});

export default CalendarDialog;
