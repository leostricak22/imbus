import {Button, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import FilterCategoryList from "./FilterCategoryList";
import FilterCountyList from "./FilterCountyList";
import FilterManipulationProps from "@/src/types/FilterManipulationProps";

const downArrowImage = require("../../../assets/icons/down-arrow.png");

export const Filter: React.FC<FilterManipulationProps> = ({ setShowFilter, setFilters }) => {
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [showCountyList, setShowCountyList] = useState(false);

    const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState([]);

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
                <Text style={{marginBottom:15, fontSize:16}}>Filtriranje</Text>
                <ScrollView style={styles.listContainer}>
                    <View>
                        <Pressable style={styles.list} onPress={toggleCategoryList}>
                            <Text style={styles.listText}>
                                {showCategoryList ? "Sakrij kategorije" : "Kategorije"}
                            </Text>
                            <Image source={downArrowImage} style={{width:20, height:20}} />
                        </Pressable>
                        <FilterCategoryList visible={showCategoryList}  selectedCategoryTypes={selectedCategoryTypes} setSelectedCategoryTypes={setSelectedCategoryTypes}/>
                    </View>
                    <View>
                        <Pressable style={styles.list} onPress={toggleCountyList}>
                            <Text style={styles.listText}>
                                {showCountyList ? "Sakrij županije" : "Županije"}
                            </Text>
                            <Image source={downArrowImage} style={{width:20, height:20}} />
                        </Pressable>
                        <FilterCountyList visible={showCountyList} selectedCounty={selectedCounty} setSelectedCounty={setSelectedCounty}/>
                    </View>
                </ScrollView>
                <Button title="Primjeni filter" onPress={() => applyFilter()} />
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
        borderRadius: 15,
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
        margin: 5,
        backgroundColor: '#0478ca',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listText: {
        color: 'white',
    },
})

export default Filter;