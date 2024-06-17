// ChatInput.js
import {Pressable, TextInput, View, StyleSheet} from "react-native";
import {SvgXml} from "react-native-svg";
import calendar from "@/assets/icons/navigation/calendar";
import {colors} from "@/src/styles/colors";
import send from "@/assets/icons/chat/send";
import React, {useEffect, useState} from "react";
import {ChatInputProps} from "@/src/types/chat/ChatInputProps";
import CalendarModal from "@/src/components/Dialogs/CalendarDialog";

export const ChatInput: React.FC<ChatInputProps> = ({message, setMessage, calendarOption=true, submit, role, otherUser, calendarTrigger, setCalendarTrigger}) => {
    const [hoverStates, setHoverStates] = useState({
        send: false,
    });
    const [modalVisible, setModalVisible] = useState(false);

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    function openCalendar() {
        setModalVisible(true);
    }

    function closeCalendar() {
        setModalVisible(false);
        setCalendarTrigger(false);
    }

    useEffect(() => {
        if (calendarTrigger) {
            openCalendar();
        }
    }, [calendarTrigger]);

    return (
        <View style={styles.sendContainer}>
            {calendarOption && otherUser && <CalendarModal modalVisible={modalVisible} closeCalendar={closeCalendar} role={role} otherUser={otherUser} /> }
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Napiši poruku..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                {calendarOption &&
                <View style={styles.iconContainer}>
                    <Pressable style={styles.icon}
                               onPress={openCalendar}
                    >
                        <SvgXml
                            width="100%"
                            height="100%"
                            xml={calendar}
                        />
                    </Pressable>
                </View>
                }
            </View>
            <Pressable style={[styles.send, role == 'CLIENT' ? (hoverStates.send ? colors.backgroundDarkBlue : colors.backgroundBlue) : (hoverStates.send ? colors.backgroundDarkOrange : colors.backgroundOrange)]}
                       onPress={() => {
                           submit();
                           setMessage("");
                       }
                       }
                       onPressIn={() => setHoverState("send", true)}
                       onPressOut={() => setHoverState("send", false)}
            >
                <SvgXml
                    width="75%"
                    height="75%"
                    xml={send}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    sendContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row',
    },
    inputContainer: {
        backgroundColor: 'white',
        height: 50,
        width: '78%',
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        flexDirection: 'row',
    },
    input: {
        height: 50,
        width: '82%',
        paddingLeft: 20,
    },
    icon: {
        height: 20,
        width: 20,
    },
    iconContainer: {
        height: 50,
        width: '18%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    send: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 50,
    },
})
