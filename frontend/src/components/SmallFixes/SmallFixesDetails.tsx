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
import calendar_expert from "@/assets/icons/navigation/calendar_expert";
import location_expert from "@/assets/icons/info/location_expert";
import ViewSmallFixesProps from "@/src/types/smallFixes/ViewSmallFixesProps";

export const SmallFixesDetails: React.FC<ViewSmallFixesProps> = ({ navigation, smallFixesForm, images, role="CLIENT" }) => {
    const [parentWidth, setParentWidth] = useState(0);

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    return (
        <View>
            <Text style={styles.description}>
                {smallFixesForm.description}
            </Text>
            {images && images.length > 0 && <View style={styles.photoEdit} onLayout={onLayout}>
                <PhotoSlider images={images} parentWidth={parentWidth}/>
            </View>}
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
        marginBottom: 25,
        paddingHorizontal: 15,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        height: 30,
        paddingHorizontal: 15,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    }
});

export default SmallFixesDetails;