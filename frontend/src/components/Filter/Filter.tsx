import {Button, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";

import FilterCountyList from "./FilterCountyList";
import FilterManipulationProps from "@/src/types/filter/FilterManipulationProps";
import {colors} from "@/src/styles/colors";

const downArrowImage = require("../../../assets/icons/down-arrow.png");
import FilterCategoryList from "@/src/components/Filter/FilterCategoryList";
import {SvgXml} from "react-native-svg";
import arrow_down from "@/assets/icons/filters/arrow_down";
import {button} from "@/src/styles/button";

export const Filter: React.FC<FilterManipulationProps> = ({ setShowFilter, setFilters, role }) => {
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [showCountyList, setShowCountyList] = useState(false);

    const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState([]);

    const [hoverStates, setHoverStates] = useState({
        confirm: false,
    });

    const setHoverState = (key: keyof typeof hoverStates, value: boolean) => {
        setHoverStates(prevState => ({ ...prevState, [key]: value }));
    };

    const toggleCategoryList = () => {
        setShowCategoryList(!showCategoryList);
    };

    const toggleCountyList = () => {
        setShowCountyList(!showCountyList);
    };

    const applyFilter = () => {
        let allFilters:any = [];

        for(let i = 0; i < selectedCategoryTypes.length; i++)
            allFilters.push({"name":"CATEGORY", "value":selectedCategoryTypes[i]});

        for(let i = 0; i < selectedCounty.length; i++)
            allFilters.push({"name":"LOCATION", "value":selectedCounty[i]});

        setFilters(allFilters);

        setShowFilter(false);
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.bluredModalContainer} onPress={() => setShowFilter(false)}>
            </Pressable>

            <View style={styles.modalFilterContainer}>
                <Text style={{marginVertical:15, fontSize:22}}>Filtriranje</Text>
                <ScrollView style={styles.listContainer}>
                    <View>
                        <Pressable style={[styles.list, role === 'CLIENT' ? colors.backgroundBlue : colors.backgroundOrange]} onPress={toggleCategoryList}>
                            <Text style={styles.listText}>
                                {showCategoryList ? "Sakrij kategorije" : "Kategorije"}
                            </Text>
                            <View style={styles.arrowDown}>
                                <SvgXml width="100%" height="100%" xml={arrow_down} />
                            </View>
                        </Pressable>
                        <FilterCategoryList role={role} visible={showCategoryList}  selectedCategoryTypes={selectedCategoryTypes} setSelectedCategoryTypes={setSelectedCategoryTypes}/>
                    </View>
                    <View>
                        <Pressable style={[styles.list, role === 'CLIENT' ? colors.backgroundBlue : colors.backgroundOrange]} onPress={toggleCountyList}>
                            <Text style={styles.listText}>
                                {showCountyList ? "Sakrij županije" : "Županije"}
                            </Text>
                            <View style={styles.arrowDown}>
                                <SvgXml width="100%" height="100%" xml={arrow_down} />
                            </View>
                        </Pressable>
                        <FilterCountyList role={role} visible={showCountyList} selectedCounty={selectedCounty} setSelectedCounty={setSelectedCounty}/>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.submit}>
                <Pressable
                    style={[
                        button.buttonContainer,
                        {borderWidth: 1, justifyContent: 'center', width: '100%'},
                        hoverStates.confirm ? colors.backgroundGray : colors.backgroundWhite
                    ]}
                    onPress={applyFilter}
                    onPressIn={() => setHoverState("confirm", true)}
                    onPressOut={() => setHoverState("confirm", false)}
                >
                    <Text style={[button.buttonText, colors.black]}>Potvrdi</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
    },
    bluredModalContainer: {
        width: "100%",
        height: "50%",
    },
    modalFilterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 20
    },
    listContainer: {
        flex: 1,
        width: "100%",
    },
    list: {
        width: "100%",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },
    arrowDown: {
        width: 30,
        height: 30,
    },
    submit: {
        backgroundColor: 'white',
        paddingBottom: 40,
        paddingHorizontal: 15,
    }
})

export default Filter;