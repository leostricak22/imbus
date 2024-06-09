import React, {useEffect, useState} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import FormProps from "@/src/types/form/FormProps";
import {Text, View, StyleSheet, TextInput} from "react-native";
import DropdownInput from "@/src/components/InputTypes/DropdownInput";
import {categoryTypes} from "@/src/data/CategoryTypes";
import build from "@/assets/icons/dropdown/build";
import location from "@/assets/icons/dropdown/location";
import {counties} from "@/src/data/Counties";
import CheckboxWithText from "@/src/components/InputTypes/CheckboxWithText";
import {input} from "@/src/styles/input";
import DateTimeInput from "@/src/components/InputTypes/DateTimeInput";
import CalendarMultipleDays from "@/src/components/Calendar/CalendarMultipleDays";

export const AdFormStep2: React.FC<FormProps> = ({ form, setForm }) => {
    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);

    useEffect(() => {
        console.log(form)
    }, [form]);

    useEffect(() => {
        setForm({
            ...form,
            do_the_job_from: firstDate,
            do_the_job_to: secondDate,
        });

        console.log(form)
    }, [firstDate, secondDate]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Kada se posao može obaviti?
            </Text>
            <View style={styles.dateContainerFields}>
                <CalendarMultipleDays firstDate={firstDate} secondDate={secondDate} setFirstDate={setFirstDate} setSecondDate={setSecondDate}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    dateContainerFields: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    dateInputContainer: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
});