import {Button, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import React, {useEffect, useState} from "react";
import FilterCategoryList from "./FilterCategoryList";
import FilterCountyList from "./FilterCountyList";

const downArrowImage = require("../../../assets/icons/down-arrow.png");

export default function Filter({ visible, setShowFilter }) {
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

    return (
        <View style={styles.modalFilterContainer}>
            <Text>Filter Section</Text>
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
            <Button title="Primjeni filter" onPress={() => setShowFilter(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    modalFilterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        width: "70%",
        margin: "50%",
        padding: 10,
    },
    listContainer: {
        flex: 1,
        width: "100%",
    },
    list: {
        width: "100%",
        padding: 10,
        margin: 5,
        backgroundColor: '#209cee',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listText: {
        color: 'white',
    },
})