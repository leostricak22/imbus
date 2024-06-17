import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import FilterItemProps from "@/src/types/filter/FilterItemProps";

export const FilterItem:React.FC<FilterItemProps> = ({ role, label, isSelected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.unselectedFilterContainer, isSelected && (role == "CLIENT" ? {backgroundColor:"lightblue"} : {backgroundColor:"#FFDEAD"})]}>
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

export default FilterItem;