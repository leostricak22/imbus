import {ScrollView} from "react-native";
import FilterItem from "./FilterItem";
import {categoryTypes} from "../../data/CategoryTypes";

export default function FilterCategoryList({ visible, selectedCategoryTypes, setSelectedCategoryTypes }:any) {
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
                    key={index}
                    label={category.label}
                    isSelected={selectedCategoryTypes.includes(category.value)}
                    onPress={() => toggleSelection(category.value)}
                />
            ))}
        </ScrollView>
    );
};