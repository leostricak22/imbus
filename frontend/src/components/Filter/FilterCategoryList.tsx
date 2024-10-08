import {ScrollView} from "react-native";
import FilterItem from "./FilterItem";
import {categoryTypes} from "../../data/CategoryTypes";
import React from "react";
import FilterCategoryListProps from "@/src/types/filter/FilterCategoryListProps";

const FilterCategoryList: React.FC<FilterCategoryListProps> =  ({ role, visible, selectedCategoryTypes, setSelectedCategoryTypes }) => {
    const toggleSelection = (item: string) => {
        if (selectedCategoryTypes.includes(item)) {
            setSelectedCategoryTypes(selectedCategoryTypes.filter((i: string) => i !== item));
        } else {
            setSelectedCategoryTypes([...selectedCategoryTypes, item]);
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <ScrollView>
            {categoryTypes.map((category, index) => (
                <FilterItem
                    role={role}
                    key={index}
                    label={category.label}
                    isSelected={selectedCategoryTypes.includes(category.value)}
                    onPress={() => toggleSelection(category.value)}
                />
            ))}
        </ScrollView>
    );
};

export default FilterCategoryList;