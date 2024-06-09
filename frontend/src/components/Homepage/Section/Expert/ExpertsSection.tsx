import {ActivityIndicator, Text, Image, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import getExperts from "../../../../services/expert/getExperts";
import Filter from "../../../Filter/Filter";
import ExpertContainer from "./ExpertContainer";
import {Expert} from "@/src/interface/Expert";
import {input} from "@/src/styles/input";
import {SvgXml} from "react-native-svg";
import accountProfileImage from "@/assets/icons/Account/AccountProfileImage";
import search from "@/assets/icons/filters/search";
import filter from "@/assets/icons/filters/filter";
import sort from "@/assets/icons/filters/sort";
import {AppliedFilters} from "@/src/components/Filter/AppliedFilters";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";


const ExpertSection: React.FC<NavigationParameter> = ({ navigation }) => {
    const { allExpertData, dataLoading, refetchAllExpertData, filters, setFilters } = getExperts();
    const [refreshing, setRefreshing] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [searchText, setSearchText] = useState({});

    const refresh = async () => {
        setRefreshing(true);
        await refetchAllExpertData();
        setRefreshing(false);
    };

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
                <View style={styles.search}>
                    <View style={input.inputContainer}>
                        <View style={input.inputIcon}>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={search}
                            />
                        </View>
                        <TextInput
                            style={input.input}
                            placeholder="Pretraži znalce..."
                            onChangeText={(text:string) => setSearchText(text)}
                        />
                    </View>
                </View>
                <View style={styles.filterIconsContainer}>
                    <Pressable onPress={() => setShowFilter(true)}>
                        <View style={styles.icon}>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={filter}
                            />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={styles.icon}>
                            <SvgXml
                                width="100%"
                                height="100%"
                                xml={sort}
                            />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.appliedFiltersContainer}>
                    {filters && filters.length > 0 &&  <AppliedFilters filters={filters}/>}
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
                        <ActivityIndicator size="large" color="#0478ca" />
                    ) : (
                        <>
                            {allExpertData.map((expert: Expert) => (
                                <ExpertContainer key={expert.id} expert={expert} navigation={navigation} />
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
        width: '100%',
        margin: 'auto',
    },
    scrollViewContainer: {
        flex: 1,
    },
    itemContainer: {
        marginTop: 20,
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
    },
    filterIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        padding: 5,
    },
    search: {
        width: '90%',
        marginTop: 15,
    },
    icon: {
        height: 20,
        width: 20,
    },
    appliedFiltersContainer: {
        width: '90%',
        alignSelf: 'flex-start',
        marginVertical: 5,
    }
});

export default ExpertSection;