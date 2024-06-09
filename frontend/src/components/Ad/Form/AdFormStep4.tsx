import React, {useState} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import FormProps from "@/src/types/form/FormProps";
import {Text, View, StyleSheet, TextInput} from "react-native";
import DropdownInput from "@/src/components/InputTypes/DropdownInput";
import {categoryTypes} from "@/src/data/CategoryTypes";
import build from "@/assets/icons/dropdown/build";
import location from "@/assets/icons/info/location";
import {counties} from "@/src/data/Counties";
import CheckboxWithText from "@/src/components/InputTypes/CheckboxWithText";
import {input} from "@/src/styles/input";
import DateTimeInput from "@/src/components/InputTypes/DateTimeInput";
import PhotoSliderEdit from "@/src/components/Ad/PhotoSliderEdit";
import {ViewAdProps} from "@/src/types/ad/ViewAdProps";
import PhotoSlider from "@/src/components/Ad/PhotoSlider";
import calendar from "@/assets/icons/navigation/calendar";
import {SvgXml} from "react-native-svg";
import calendar_client from "@/assets/icons/navigation/calendar_client";
import AdDetails from "@/src/components/Ad/AdDetails";

export const AdFormStep4: React.FC<ViewAdProps> = ({ navigation, adForm, images }) => {
    const [parentWidth, setParentWidth] = useState(0);

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    function formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        return `${day}.${month}.`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Izgled oglasa
            </Text>
            <AdDetails images={images} adForm={adForm} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        width: '100%',
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
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        height: 30,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    }
});

export default AdFormStep4;