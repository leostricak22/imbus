import {Pressable, TextInput, View, Text, StyleSheet} from "react-native";
import {SvgXml} from "react-native-svg";
import calendar from "@/assets/icons/navigation/calendar";
import {colors} from "@/src/styles/colors";
import send from "@/assets/icons/chat/send";
import React, {useState} from "react";
import {ChatInputProps} from "@/src/types/ChatInputProps";

export const ChatInput: React.FC<ChatInputProps> = ({message, setMessage, submit, role}) => {
    const [hoverStates, setHoverStates] = useState({
        send: false,
    });


    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    return (
        <View style={styles.sendContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Napiši poruku..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <View style={styles.iconContainer}>
                    <Pressable style={styles.icon}>
                        <SvgXml
                            width="100%"
                            height="100%"
                            xml={calendar}
                        />
                    </Pressable>
                </View>
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