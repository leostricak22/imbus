import {ScrollView} from "react-native";
import FilterItem from "./FilterItem";
import {counties} from "../../data/Counties"
import React from "react";
import FilterCountyListProps from "@/src/types/filter/FilterCountyListProps";

const FilterCountyList: React.FC<FilterCountyListProps> = ({ role, visible, selectedCounty, setSelectedCounty }) => {
    const toggleSelection = (item: string) => {
        if (selectedCounty.includes(item)) {
            setSelectedCounty(selectedCounty.filter((i: string) => i !== item));
        } else {
            setSelectedCounty([...selectedCounty, item]);
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <ScrollView>
            {counties.map((county, index) => (
                <FilterItem
                    role={role}
                    key={index}
                    label={county.label}
                    isSelected={selectedCounty.includes(county.value)}
                    onPress={() => toggleSelection(county.value)}
                />
            ))}
        </ScrollView>
    );
};

export default FilterCountyList;