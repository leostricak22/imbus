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
                    <View key={index} style={{ width, height }}>
                        <Image key={index} source={{ uri: image }} style={{ width, height, resizeMode: 'cover' }} />
                        <Text
                            style={styles.imageNumber}
                        >
                            {parseInt(index as string) + 1}/{images.length}
                        </Text>
                    </View>
                ))}

            </ScrollView>
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

export default PhotoSlider;