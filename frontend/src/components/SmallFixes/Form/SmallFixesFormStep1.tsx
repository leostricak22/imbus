import React, {useState} from "react";
import FormProps from "@/src/types/form/FormProps";
import {View, Text, StyleSheet, TextInput} from "react-native";
import {input} from "@/src/styles/input";
import PhotoSliderEdit from "@/src/components/Ad/PhotoSliderEdit";

export const SmallFixesFormStep1: React.FC<FormProps> = ({ form, setForm, images, setImages }) => {
    const [parentWidth, setParentWidth] = useState(0);

    const handleChange = (inputTag: string, value: string) => {
        setForm((prevForm: any) => ({ ...prevForm, [inputTag]: value }));
    };

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Opis i fotografije
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Opis
                </Text>
                <View style={input.inputShadowLargeContainer}>
                    <TextInput
                        style={input.inputNoIcon}
                        placeholder="Opišite koji se posao mora obaviti sa svim detaljima (površina, mjesto obavljanja radova...)"
                        value={form && form.description}
                        multiline={true}
                        onChangeText={(text) => handleChange("description", text)}
                    />

                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Ovdje prenesite fotografije
                </Text>
                <View style={styles.photoEdit} onLayout={onLayout}>
                    <PhotoSliderEdit images={ images ? images : {} as string[] } setImages={setImages} parentWidth={parentWidth} />
                </View>
            </View>

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

export default SmallFixesFormStep1;