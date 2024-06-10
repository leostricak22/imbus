import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import React, {useEffect, useState} from "react";
import ProgressBar from "@/src/components/Ad/ProgressBar";
import {SvgXml} from "react-native-svg";
import arrow_back from "@/assets/icons/header/arrow_back";
import {AdFormStep1} from "@/src/components/Ad/Form/AdFormStep1";
import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";
import {categoryTypes} from "@/src/data/CategoryTypes";
import {counties} from "@/src/data/Counties";
import {AdFormStep2} from "@/src/components/Ad/Form/AdFormStep2";
import {validate} from "@babel/types";
import {AdFormStep3} from "@/src/components/Ad/Form/AdFormStep3";
import AdFormStep4 from "@/src/components/Ad/Form/AdFormStep4";
import CheckboxWithText from "@/src/components/InputTypes/CheckboxWithText";
import addAd from "@/src/services/ad/addAd";
import SmallFixesFormStep1 from "@/src/components/SmallFixes/Form/SmallFixesFormStep1";
import SmallFixesFormStep2 from "@/src/components/SmallFixes/Form/SmallFixesFormStep2";
import addSmallFixes from "@/src/services/smallfixes/addSmallFixes";

export const AddSmallFixes: React.FC<NavigationParameter> = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({} as SmallFixesForm);
    const [errorData, setErrorData] = useState("");
    const [images, setImages] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const { publishSmallFixes, uploading, error } = addSmallFixes({});

    const handleToggleCheckbox = () => {
        setIsChecked(!isChecked);
        setErrorData("");
    };

    const [hoverStates, setHoverStates] = useState({
        next: false,
    });

    const setHoverStateTrue = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: true }));
    }

    const setHoverStateFalse = (key: any) => {
        setHoverStates(prevState => ({ ...prevState, [key]: false }));
    }

    function validateAdStep1() {
        const validCategories = categoryTypes.map(category => category.value);
        const validCounties = counties.map(county => county.value);

        if (!form.description || form.description.length === 0) {
            setErrorData('Upišite opis sitnog kvara!');
            return false;
        }

        return true;
    }

    function next() {
        if(!validateAdStep1() && step >= 1) return;

        setErrorData("");
        setStep(step + 1);
    }

    function back() {
        setErrorData("");

        if(step === 1) return navigation.goBack()
        else setStep(step - 1);
    }

    const handleSubmit = async () => {
        const requestData:any = new FormData();

        images.forEach((image, index) => {
            requestData.append("attachments", {
                uri: image,
                type: 'image/jpeg',
                name: `image${index}.jpg`
            });
        });

        requestData.append("smallfixes", JSON.stringify(form));

        console.log(requestData)

        try {
            publishSmallFixes(requestData);
            if(!error) navigation.navigate("homepage")
            else setErrorData("Došlo je do greške!");
        } catch (err) {
            console.error(err);
            setErrorData("Došlo je do greške prilikom slanja podataka!");
        }
    };

    async function checkAndSubmitAd() {
        if(!isChecked) {
            setErrorData("Morate prihvatiti uvjete korištenja oglasa!");
            return;
        }

        setErrorData("");
        await handleSubmit();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.arrowBack}
                           onPress={() => back()}
                >
                    <SvgXml width="100%" height="100%"  xml={arrow_back} />
                </Pressable>
                <ProgressBar step={step} maxStep={2} />
            </View>
            <ScrollView style={styles.formContainer}>
                {
                    step === 1 && <SmallFixesFormStep1 form={form} setForm={setForm} setImages={setImages} images={images} />
                }
                {
                    step === 2 && <SmallFixesFormStep2 form={form} setForm={setForm} images={images} />
                }
            </ScrollView>
            {errorData && <Text style={styles.error}>{errorData}</Text>}
            {step !== 2 ?
                (
                    <Pressable
                        style={[button.buttonContainer, hoverStates.next ? colors.backgroundDarkBlue : colors.backgroundBlue]}
                        onPress={() => next()}
                        onPressIn={() => setHoverStateTrue("next")}
                        onPressOut={() => setHoverStateFalse("next")}
                    >
                        <Text style={button.buttonText}>Dalje</Text>
                    </Pressable>
                ) : (
                    <>
                        <View style={{marginBottom:10}}>
                            <CheckboxWithText label={"Prihvaćam uvjete korištenja oglasa"} isChecked={isChecked} onToggle={handleToggleCheckbox} />
                        </View>
                        <Pressable
                            style={isChecked ? [button.buttonContainer, hoverStates.next ? colors.backgroundDarkBlue : colors.backgroundBlue] : [button.buttonContainer, colors.backgroundGray]}
                            onPress={() => checkAndSubmitAd()}
                            onPressIn={() => setHoverStateTrue("next")}
                            onPressOut={() => setHoverStateFalse("next")}
                        >
                            <Text style={button.buttonText}>Objavi</Text>
                        </Pressable>
                    </>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
    },
    header: {
    },
    arrowBack: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 20,
        height: 20,
        zIndex: 1,
    },
    formContainer: {
        flex: 1,
    },
    error: {
        color: 'red',
        textAlign: 'center'
    }
});

export default AddSmallFixes;