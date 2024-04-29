import {Text, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {categoryTypes} from "../../data/CategoryTypes";

export default function DropdownInput({handleChange, items, formData, formDataItem}) {
    return (
        <View style={styles.container}>
            <View style={styles.picker}>
                <RNPickerSelect
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
        borderRadius: 5,
        color: "black",
    }
}