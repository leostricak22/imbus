import {View, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React from "react";
import FormProps from "@/src/types/form/FormProps";
import DropDownInputProps from "@/src/types/inputTypes/DropDownInputProps";
import {SvgXml} from "react-native-svg";
import arrow_back from "@/assets/icons/header/arrow_back";

export const DropdownInput: React.FC<DropDownInputProps> = ({handleChange, items, formData, formDataItem, icon}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {icon &&
                    <View style={styles.iconContainer}>
                        <View style={styles.icon}>
                            <SvgXml width="100%" height="100%"  xml={icon} />
                        </View>
                    </View>
                }
                <View style={[styles.picker, !icon && {width:"100%"}]}>
                    <RNPickerSelect
                        placeholder={{label: "Odaberi..."}}
                        onValueChange={(value) => handleChange(formDataItem, value)}
                        items={items}
                        value={formData[formDataItem]}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row' as 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        color: "black",

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity:  0.19,
        shadowRadius: 5.62,
        elevation: 4
    },
    picker: {
        alignSelf: 'flex-end' as 'flex-end',
        width: '85%' as '85%',
    },
    iconContainer: {
        alignSelf: 'center' as 'center',
        width: '15%' as '15%',
    },
    icon: {
        width: 25,
        height: 25,
        alignSelf: 'center' as 'center',
        marginLeft: 20,
    }
}
export default DropdownInput;