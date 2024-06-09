import {SvgXml} from "react-native-svg";
import React from "react";
import {StyleSheet, View, Text, ScrollView, ActivityIndicator} from "react-native";

import close_client from "@/assets/icons/filters/close_client";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {FiltersProps} from "@/src/types/filter/FiltersProps";
import ExpertContainer from "@/src/components/Homepage/Section/Expert/ExpertContainer";
import Filter from "@/src/interface/Filter";
import {categoryTypes} from "@/src/data/CategoryTypes";
import {counties} from "@/src/data/Counties";
import close_expert from "@/assets/icons/filters/close_expert";

export const AppliedFilters: React.FC<FiltersProps> = ({ filters, color="#0478ca" }) => {

    function getFilterText(filter: Filter) {
        if(filter.name === "LOCATION")
            return counties.find(county => county.value === filter.value)?.label;
        else if(filter.name === "CATEGORY")
            return categoryTypes.find(type => type.value === filter.value)?.label;
    }

    function getContainerWidth(text: string | undefined) {
        const minWidth = 140; // Minimum width
        const padding = 20; // Padding on both sides
        const textWidth = text ? text.length * 8 : 0; // Adjust multiplier based on font size
        return Math.max(minWidth, textWidth + padding);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
            >
                {filters && filters.map((filter: Filter, index: number) => (
                    <View key={index} style={[styles.appliedFiltersContainer, { width: getContainerWidth(getFilterText(filter)) }]}>
                        <View style={[styles.appliedFilter, {borderColor:color}]}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.appliedFilterText, {color:color}]}>{getFilterText(filter)}</Text>
                            <View style={styles.appliedFilterRemove}>
                                <SvgXml
                                    width="50%"
                                    height="50%"
                                    xml={color == "#0478ca" ? close_client : close_expert}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40
    },
    scrollViewContainer: {
        flex: 1,
    },
    appliedFiltersContainer: {
        height: 40,
        minWidth: 140, // Minimum width
        marginLeft: 5,
    },
    appliedFilter: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 10,
        height: '100%',
        borderColor: "#0478ca",
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    appliedFilterText: {
        flex: 1,
        color: "#0478ca",
        textAlign: 'center',
    },
    appliedFilterRemove: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
