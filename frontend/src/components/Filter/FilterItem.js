import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default function FilterItem({ label, isSelected, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.unselectedFilterContainer, isSelected && styles.selectedFilterContainer]}>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    unselectedFilterContainer: {
        padding: 10,
        margin: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    selectedFilterContainer: {
        backgroundColor: 'lightblue',
    },
});