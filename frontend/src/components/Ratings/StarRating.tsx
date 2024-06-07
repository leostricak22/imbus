import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const StarRating: React.FC<StarRatingProps> = ({
                                                   rating,
                                                   maxStars = 5,
                                                   onRatingChange,
                                                   starSize = 15,
                                                   starColor = 'gold',
                                               }) => {
    const starPath = "M12 .587l3.668 7.568L24 9.423l-6 6.064 1.416 8.513L12 19.647l-7.416 4.353L6 15.487l-6-6.064 8.332-1.268L12 .587z";

    const renderStar = (filled: boolean, index: number, half: boolean = false) => (
        <TouchableOpacity
            key={index}
            activeOpacity={onRatingChange ? 0.7 : 1}
            onPress={() => onRatingChange && onRatingChange(index + 1)}
            style={{ width: starSize, height: starSize }}
        >
            <Svg
                width={starSize}
                height={starSize}
                viewBox="0 0 24 24"
                fill={filled ? starColor : 'lightgray'}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d={starPath} />
                {half && (
                    <Path
                        d="M12 .587l-3.668 7.568L0 9.423l6 6.064-1.416 8.513L12 19.647V.587z"
                        fill={starColor}
                        stroke="none"
                    />
                )}
            </Svg>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {Array.from({ length: maxStars }, (_, index) => {
                const filled = index + 1 <= Math.floor(rating);
                const half = index + 1 === Math.ceil(rating) && rating % 1 !== 0;
                return renderStar(filled, index, half);
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default StarRating;
