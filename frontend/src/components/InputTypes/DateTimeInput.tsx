import {Platform, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimeInput({formData, setFormData, formDataItem}:any) {
    const formatDateString = (date:Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}.`;
    };

    const handlePickerChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || formData[formDataItem];

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [formDataItem]: currentDate,
            showPicker: Platform.OS === 'ios'
        }));
    };

    const showDatePicker = () => {
        setFormData({ ...formData, showPicker: true });
    };


    return (
        <View>
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    style={styles.dateTimeInput}
                    editable={false}
                    value={formatDateString(formData[formDataItem])}
                />
            </TouchableOpacity>
            {formData.showPicker && (
                <DateTimePicker
                    testID={`${formDataItem}DateTimePicker`}
                    value={formData[formDataItem]}
                    mode="date"
                    display="default"
                    onChange={handlePickerChange}
                />
            )}
        </View>
    )
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