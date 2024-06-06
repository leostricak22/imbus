import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../components/Partials/Header";
import React, {useState} from "react";
import PhotoSliderEdit from "../components/Ad/PhotoSliderEdit";
import Form from "../components/Ad/Form";
import addAd from "../services/addAd";
import {NavigationParameter} from "@/src/types/NavigationParameter";

export const AddAd: React.FC<NavigationParameter> = ({ navigation }) => {
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

    const { addAd:any, uploading, error } = addAd({});

    const handleSubmit = async () => {
        const requestData:any = new FormData();

        images.forEach((image, index) => {
            requestData.append("attachments", {
                uri: image,
                type: 'image/jpeg',
                name: `image${index}.jpg`
            });
        });

        requestData.append("ad", JSON.stringify(formData));

        addAd(requestData);

        if(!error) navigation.goBack()
    };


    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            { error && <Text style={styles.error}>{error}</Text>}
            <ScrollView style={styles.containerScrollView}>
                <PhotoSliderEdit images={images} setImages={setImages} />
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