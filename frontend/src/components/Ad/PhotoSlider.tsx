import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

const PhotoSlider = ({images, parentWidth=Dimensions.get('window').width}:any) => {
    const width  = parentWidth;
    const height = width;

    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }:any) => {
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
                {images.map((image: any, index: React.Key | null | undefined) => (
                    <Image key={index} source={{ uri: image }} style={{ width, height, resizeMode: 'cover' }} />
                ))}
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