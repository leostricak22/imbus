import React, {useState} from "react";
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

export const AdFormStep1: React.FC<FormProps> = ({ form, setForm }) => {
    const [pickedLocation, setPickedLocation] = React.useState("");
    const [pickedCategory, setPickedCategory] = React.useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (inputTag: string, value: string) => {
        setForm((prevForm: any) => ({ ...prevForm, [inputTag]: value }));
    };

    const handleChangeLocation = (name: string, value: string) => {
        setPickedLocation(value);
        setForm({ ...form, location: value });
    };

    const handleChangeCategory = (name: string, value: string) => {
        setPickedCategory(value);
        setForm({ ...form, categories: value });
    };

    const handleToggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Objava oglasa
            </Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Kategorija posla
                </Text>
                <DropdownInput handleChange={handleChangeCategory} items={categoryTypes} formData={form} formDataItem={"categories"} icon={build}/>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Županija
                </Text>
                <DropdownInput handleChange={handleChangeLocation} items={counties} formData={form} formDataItem={"location"} icon={location}/>
            </View>

            <View style={styles.inputContainer}>
                <CheckboxWithText label={"Detalji lokacije (nije obavezno)"} isChecked={isChecked} onToggle={handleToggleCheckbox} />
            </View>

            {
                isChecked && <View style={styles.locationDetails}>
                    <View>
                        <Text style={styles.label}>
                            Poštanski broj
                        </Text>
                        <View style={input.inputShadowContainer}>
                            <TextInput
                                style={input.inputNoIcon}
                                placeholder="Poštanski broj"
                                keyboardType="numeric"
                                value={form && form.postal_code}
                                onChangeText={(text) => handleChange("postal_code", text)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                            Adresa
                        </Text>
                        <View style={input.inputShadowContainer}>
                            <TextInput
                                style={input.inputNoIcon}
                                placeholder="Adresa"
                                value={form && form.address}
                                onChangeText={(text) => handleChange("address", text)}
                            />
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 15,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    locationDetails: {

    }
});