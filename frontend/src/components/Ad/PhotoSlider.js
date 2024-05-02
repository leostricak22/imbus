import React, { useState } from 'react';
import {View, Image, ScrollView, Dimensions, StyleSheet, Text, useWindowDimensions} from 'react-native';

const PhotoSlider = ({images, parentWidth=Dimensions.get('window').width}) => {
    const width  = parentWidth;
    const height = width;

    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }

    return (
        <View>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                style={{ width, height }}
            >
                {images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={{ width, height, resizeMode: 'cover' }} />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((i, k) => (
                    <Text key={k} style={k === active ? styles.activeDot : styles.dot}>⬤</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default PhotoSlider;