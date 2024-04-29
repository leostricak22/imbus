import {TextInput, TouchableOpacity, View, StyleSheet, Text, Platform, ScrollView} from "react-native";
import Header from "../Partials/Header";
import {useState} from "react";

import DateTimePicker from '@react-native-community/datetimepicker';
import PhotoSlider from "./PhotoSlider";
import * as ImagePicker from "expo-image-picker";
import PhotoSliderEdit from "./PhotoSliderEdit";

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

    const formatDateString = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleFromPickerChange = (event, selectedDate) => {
        const currentDate = selectedDate || formData.do_the_job_from;
        setFormData({ ...formData, do_the_job_from: currentDate, showFromPicker: Platform.OS === 'ios' });
    };

    const handleToPickerChange = (event, selectedDate) => {
        const currentDate = selectedDate || formData.do_the_job_to;
        setFormData({ ...formData, do_the_job_to: currentDate, showToPicker: Platform.OS === 'ios' });
    };

    const showFromDatePicker = () => {
        setFormData({ ...formData, showFromPicker: true });
    };

    const showToDatePicker = () => {
        setFormData({ ...formData, showToPicker: true });
    };

    const handleSubmit = () => {
        // Handle form submission, e.g., send data to backend
        console.log(formData);
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView style={styles.containerScrollView}>
                <PhotoSliderEdit images={images} setImages={setImages} style={{width:"100%", height:"100"}} />
                <View style={styles.form}>
                    <TouchableOpacity onPress={showFromDatePicker}>
                        <Text style={styles.label}>From</Text>
                        <TextInput
                            style={styles.dateTimeInput}
                            editable={false}
                            value={formatDateString(formData.do_the_job_from)}
                        />
                    </TouchableOpacity>
                    {formData.showFromPicker && (
                        <DateTimePicker
                            testID="fromDateTimePicker"
                            value={formData.do_the_job_from}
                            mode="date"
                            display="default"
                            onChange={handleFromPickerChange}
                        />
                    )}
                    <TouchableOpacity onPress={showToDatePicker}>
                        <Text style={styles.label}>To</Text>
                        <TextInput
                            style={styles.dateTimeInput}
                            editable={false}
                            value={formatDateString(formData.do_the_job_to)}
                        />
                    </TouchableOpacity>
                    {formData.showToPicker && (
                        <DateTimePicker
                            testID="toDateTimePicker"
                            value={formData.do_the_job_to}
                            mode="date"
                            display="default"
                            onChange={handleToPickerChange}
                        />
                    )}
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.location}
                        onChangeText={(text) => handleChange('location', text)}
                    />
                    <Text style={styles.label}>Categories</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.categories.join(', ')}
                        onChangeText={(text) => handleChange('categories', text.split(', '))}
                    />
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.title}
                        onChangeText={(text) => handleChange('title', text)}
                    />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        multiline
                        value={formData.description}
                        onChangeText={(text) => handleChange('description', text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
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
    form: {
        padding: 20
    },
    label: {
        fontSize: 18,
        marginBottom: 5
    },
    dateTimeInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
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
    }
});

export default AddAd;