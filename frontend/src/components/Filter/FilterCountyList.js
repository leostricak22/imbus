import {ScrollView} from "react-native";
import FilterItem from "./FilterItem";
import {counties} from "../../data/Counties"

export default function FilterCountyList({ visible, selectedCounty, setSelectedCounty }) {
    const toggleSelection = (item) => {
        if (selectedCounty.includes(item)) {
            setSelectedCounty(selectedCounty.filter(i => i !== item));
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
                    key={index}
                    label={county.label}
                    isSelected={selectedCounty.includes(county.value)}
                    onPress={() => toggleSelection(county.value)}
                />
            ))}
        </ScrollView>
    );
};
