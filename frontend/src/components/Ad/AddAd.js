import {TextInput, TouchableOpacity, View, StyleSheet, Text, Platform, ScrollView} from "react-native";
import Header from "../Partials/Header";
import {useState} from "react";

import DateTimePicker from '@react-native-community/datetimepicker';
import PhotoSlider from "./PhotoSlider";
import * as ImagePicker from "expo-image-picker";
import PhotoSliderEdit from "./PhotoSliderEdit";
import Form from "./Form";

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

    const handleSubmit = () => {
        // Handle form submission, e.g., send data to backend
        console.log(formData);
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
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
});

export default AddAd;