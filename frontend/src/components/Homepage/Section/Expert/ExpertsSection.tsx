import {ActivityIndicator, Image, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import getExperts from "../../../../services/getExperts";
import Filter from "../../../Filter/Filter";
import ExpertContainer from "./ExpertContainer";
import {Expert} from "@/src/interface/Expert";

export default function HomepageSection({ navigation }: any) {
    const { allExpertData, dataLoading, refetchAllExpertData, filters, setFilters } = getExperts();
    const [refreshing, setRefreshing] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const refresh = async () => {
        setRefreshing(true);
        await refetchAllExpertData();
        setRefreshing(false);
    };

    useEffect(() => {
        refresh();
    }, [filters]);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFilter}
                onRequestClose={() => setShowFilter(false)}
            >
                <Filter setShowFilter={setShowFilter} setFilters={setFilters} />
            </Modal>

            <View style={styles.filterContainer}>
                <TextInput style={styles.input} placeholder="Pretraži znalce..."></TextInput>
                <View style={styles.filterIconsContainer}>
                    <Pressable onPress={() => setShowFilter(true)}>
                        <Image source={require('../../../../../assets/icons/filter.png')} style={{ width: 25, height: 25 }} />
                    </Pressable>
                    <Pressable>
                        <Image source={require('../../../../../assets/icons/list.png')} style={{ width: 25, height: 25 }} />
                    </Pressable>
                </View>
            </View>

            <ScrollView style={styles.scrollViewContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            }>
                {
                    dataLoading || !allExpertData ? (
                        <ActivityIndicator size="large" color="#209cee" />
                    ) : (
                        <>
                            {allExpertData.map((expert: any) => (
                                <ExpertContainer key={expert.id} expert={expert} />
                            ))}
                        </>
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flex: 1,
    },
    itemContainer: {
        marginTop: 20,
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
    },
    filterContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
});
