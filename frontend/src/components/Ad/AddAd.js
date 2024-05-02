import {TextInput, TouchableOpacity, View, StyleSheet, Text, Platform, ScrollView} from "react-native";
import Header from "../Partials/Header";
import {useEffect, useState} from "react";

import DateTimePicker from '@react-native-community/datetimepicker';
import PhotoSlider from "./PhotoSlider";
import * as ImagePicker from "expo-image-picker";
import PhotoSliderEdit from "./PhotoSliderEdit";
import Form from "./Form";
import useUpdateUser from "../../hooks/useUpdateUser";
import useAddAd from "../../hooks/useAddAd";
import {err} from "react-native-svg";

const AddAd = ({navigation}) => {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        do_the_job_from: new Date(),
        do_the_job_to: new Date(),
        location: '',
        categories: [],
        title: '',
        description: '',
        showFromPicker: false,
        showToPicker: false,
    });
    const { addAd, uploading, error } = useAddAd();

    const handleSubmit = async () => {
        const requestData = new FormData();

        images.forEach((image, index) => {
            requestData.append("attachments", {
                uri: image,
                type: 'image/jpeg',
                name: `image${index}.jpg`
            });
        });

        requestData.append("ad", JSON.stringify(formData));

        await addAd(requestData);

        if(!error) navigation.goBack()
    };


    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            { error && <Text style={styles.error}>{error}</Text>}
            <ScrollView style={styles.containerScrollView}>
                <PhotoSliderEdit images={images} setImages={setImages} style={{width:"100%", height:"100"}} />
                <Form formData={formData} setFormData={setFormData} />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerScrollView: {
        flex: 1,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    error: {
        color: 'red',
        textAlign: 'center'
    }
});

export default AddAd;