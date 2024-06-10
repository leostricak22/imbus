import React, {useState} from "react";
import FormProps from "@/src/types/form/FormProps";
import {View, Text, StyleSheet, TextInput} from "react-native";
import {input} from "@/src/styles/input";
import PhotoSliderEdit from "@/src/components/Ad/PhotoSliderEdit";
import AdDetails from "@/src/components/Ad/AdDetails";
import SmallFixesDetails from "@/src/components/SmallFixes/SmallFixesDetails";

export const SmallFixesFormStep2: React.FC<FormProps> = ({ form, setForm, images, setImages, navigation }) => {
    const [parentWidth, setParentWidth] = useState(0);

    const handleChange = (inputTag: string, value: string) => {
        setForm((prevForm: any) => ({ ...prevForm, [inputTag]: value }));
    };

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };


    console.log(form)

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Izgled oglasa
            </Text>
            <SmallFixesDetails images={images ? images : []} smallFixesForm={form} navigation={navigation} />
        </View>
    );
};

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
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    photoEdit: {
        width: '100%',
        aspectRatio: 1,
    }
});

export default SmallFixesFormStep2;