import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from "expo-image-picker";

const PhotoSliderEdit = ({ images, setImages }:any) => {
    const { width } = Dimensions.get('window');
    const height = width;

    const [active, setActive] = useState(0);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.2,
        });

        if (!result.canceled)
            setImages([...images, result.assets[0].uri]);
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
                {images.map((image: any, index: React.Key | null | undefined) => (
                    <View key={index} style={{ width, height }}>
                        <Image source={{ uri: image }} style={{ width, height, resizeMode: 'cover' }} />
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeImage(index)}
                        >
                            <Text style={styles.removeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity
                    key="addSlide"
                    style={{ width, height, alignItems: 'center', justifyContent: 'center' }}
                    onPress={pickImage}
                >
                    <Text style={styles.addPhoto}>+</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((i: any, k: React.Key | null | undefined) => (
                    <Text key={k} style={k === active ? styles.activeDot : styles.dot}>⬤</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderBottomWidth: 1,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    dot: {
        color: '#888',
        margin: 3,
    },
    activeDot: {
        color: 'white',
        margin: 3,
    },
    addPhoto: {
        fontSize: 75,
        color: "white",
        backgroundColor: "#209cee",
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
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
    },
    removeButtonText: {
        fontSize: 16,
    }
});

export default PhotoSliderEdit;
