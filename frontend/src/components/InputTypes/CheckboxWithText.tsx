import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckboxProps, {CheckboxWithTextProps} from "@/src/types/CheckboxWithTextProps";
import {SvgXml} from "react-native-svg";
import arrow_back from "@/assets/icons/header/arrow_back";
import tick from "@/assets/icons/checkbox/tick";

const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({ label, isChecked, onToggle }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onToggle}>
            <View style={styles.box}>
                {isChecked && <SvgXml width="100%" height="100%"  xml={tick} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    box: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: '#0478ca',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
    }
});

export default CheckboxWithText;