import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {composeNode} from "yaml/dist/compose/compose-node";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import PhotoSliderProps from "@/src/types/form/PhotoSliderProps";
import {SvgXml} from "react-native-svg";
import arrow_back from "@/assets/icons/header/arrow_back";
import add_a_photo from "@/assets/icons/photo/add_a_photo";

const PhotoSliderEdit: React.FC<PhotoSliderProps> = ({ images, setImages, parentWidth=Dimensions.get('window').width }) => {
    const width = parentWidth;
    const height = width;

    const [active, setActive] = useState(0);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.2,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            console.log(images)
            console.log(...images)
            setImages([...images, result.assets[0].uri]);
        }
    };

    const removeImage = (indexToRemove: any) => {
        setImages(images.filter((image: any, index: any) => index !== indexToRemove));
    };

    const change = ({ nativeEvent }:any) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                style={{ width, height }}
            >
                {images && images.length > 0 && images.map((image: any, index: React.Key | null | undefined) => (
                    <View key={index} style={{ width, height }}>
                        <Image source={{ uri: image }} style={[styles.imageContainer, {width:width-2, height}]} />
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeImage(index)}
                        >
                            <Text style={styles.removeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.imageNumber}
                        >
                            {parseInt(index as string) + 1}/{images.length}
                        </Text>

                    </View>
                ))}

                <TouchableOpacity
                    key="addSlide"
                    style={{ width, height, alignItems: 'center', justifyContent: 'center' }}
                    onPress={pickImage}
                >
                    <SvgXml width="25%" height="25%" xml={add_a_photo} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 25,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,

        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    dot: {
        margin: 3,
    },
    activeDot: {
        color: 'white',
        margin: 3,
    },
    addPhoto: {
        fontSize: 75,
        color: "white",
        backgroundColor: "#0478ca",
        borderRadius: 100,
        width: 100,
        height: 100,
        textAlign: "center",
        textAlignVertical: "center",
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        aspectRatio: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        borderColor: 'black',
        padding: 5,
        textAlign: 'center',
    },
    removeButtonText: {
        fontSize: 16,
        alignSelf: 'center',
    },
    imageContainer: {
        borderRadius: 25,
        resizeMode: 'cover'
    },
    imageNumber: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        color: 'black',
        fontSize: 14,

        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        borderColor: 'black',
        padding: 5,
        textAlign: 'center',
    }
});

export default PhotoSliderEdit;
