import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import FormProps from "@/src/types/form/FormProps";

export const DateTimeInput: React.FC<FormProps> = ({ form, setForm, formDataItem }) => {
    const [showPicker, setShowPicker] = useState(false);

    const formatDateString = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}.`;
    };

    const handlePickerChange = (event: any, selectedDate: Date | undefined) => {
        if (!formDataItem) return;

        if (selectedDate) {
            setForm((prevFormData: any) => ({
                ...prevFormData,
                [formDataItem]: selectedDate,
            }));

            if (Platform.OS === 'android') {
                setShowPicker(false);
            }
        }

        if (Platform.OS === 'ios' && event.type === "dismissed") {
            setShowPicker(false);
        }
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    return (
        <View>
            {
                formDataItem &&
                <>
                    <TouchableOpacity onPress={showDatePicker}>
                        <TextInput
                            style={styles.dateTimeInput}
                            editable={false}
                            value={form[formDataItem] ? formatDateString(form[formDataItem]) : ""}
                        />
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            testID={`${formDataItem}DateTimePicker`}
                            value={form[formDataItem] instanceof Date ? form[formDataItem] : new Date()}
                            mode="date"
                            display="default"
                            onChange={handlePickerChange}
                        />
                    )}
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    dateTimeInput: {
        borderWidth: 1,
        borderColor: 'black',
        color: "black",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%'
    },
});

export default DateTimeInput;
