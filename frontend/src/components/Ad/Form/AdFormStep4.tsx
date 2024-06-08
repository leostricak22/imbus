import React, {useState} from "react";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import FormProps from "@/src/types/FormProps";
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
import {ViewAdProps} from "@/src/types/ViewAdProps";
import PhotoSlider from "@/src/components/Ad/PhotoSlider";
import calendar from "@/assets/icons/navigation/calendar";
import {SvgXml} from "react-native-svg";
import calendar_client from "@/assets/icons/navigation/calendar_client";

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
            {images && images.length > 0 && <View style={styles.photoEdit} onLayout={onLayout}>
                <PhotoSlider images={images} parentWidth={parentWidth}/>
            </View>}
            <Text style={styles.description}>
                {adForm.description}
            </Text>

            <View style={styles.info}>
                <View style={styles.icon}>
                    <SvgXml xml={calendar_client} width="100%" height="100%"/>
                </View>
                <Text>
                    {formatDate(adForm.do_the_job_from)} - {formatDate(adForm.do_the_job_to)}
                </Text>
            </View>

            <View style={styles.info}>
                <View style={styles.icon}>
                    <SvgXml xml={location} width="100%" height="100%"/>
                </View>
                <Text>
                    {counties.find(item => item.value === adForm.location)?.label ?? ''}
                    {adForm.postal_code && ` (${adForm.postal_code})`}
                    {adForm.address && `, ${adForm.address}`}
                </Text>
            </View>

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