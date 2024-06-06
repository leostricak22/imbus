import {StyleSheet, Text, TextInput, View} from "react-native";

import {counties} from "../../data/Counties";
import DropdownInput from "../InputTypes/DropdownInput";
import {categoryTypes} from "../../data/CategoryTypes";
import DateTimeInput from "../InputTypes/DateTimeInput";

export default function Form({formData, setFormData}:any) {
    const handleChange = (name: string, value: string) => {
        setFormData({...formData, [name]: value});
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Naslov</Text>
                <TextInput
                    style={styles.input}
                    value={formData.title}
                    onChangeText={(text) => handleChange('title', text)}
                />
            </View>

            <View>
                <Text style={styles.label}>Opis</Text>
                <TextInput
                    style={[styles.input, {height: 100}]}
                    multiline
                    value={formData.description}
                    onChangeText={(text) => handleChange('description', text)}
                />
            </View>

            <View>
                <Text style={styles.label}>Obavi posao</Text>
                <View style={styles.dateContainerFields}>
                    <View style={styles.dateInputContainer}>
                        <Text>Od</Text>
                        <DateTimeInput formData={formData} setFormData={setFormData} formDataItem={"do_the_job_from"}/>
                    </View>
                    <View style={styles.dateInputContainer}>
                        <Text>Do</Text>
                        <DateTimeInput formData={formData} setFormData={setFormData} formDataItem={"do_the_job_to"}/>
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.label}>Lokacija</Text>
                <DropdownInput handleChange={handleChange} items={counties} formData={formData}
                               formDataItem={"location"}/>
            </View>

            <View>
                <Text style={styles.label}>Kategorija</Text>
                <DropdownInput handleChange={handleChange} items={categoryTypes} formData={formData}
                               formDataItem={"categories"}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    dateContainerFields: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    dateInputContainer: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
});