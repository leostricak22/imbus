import {View} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function DropdownInput({handleChange, items, formData, formDataItem}:any) {
    return (
        <View style={styles.container}>
            <View style={styles.picker}>
                <RNPickerSelect
                    placeholder={{label: "Odaberi..."}}
                    onValueChange={(value) => handleChange(formDataItem, value)}
                    items={items}
                    value={formData[formDataItem]}
                />
            </View>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
    },
    picker: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        color: "black",
    }
}