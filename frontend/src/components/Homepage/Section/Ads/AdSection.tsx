import {
    ActivityIndicator,
    Image,
    Modal,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from "react-native";
import Filter from "../../../Filter/Filter";
import React, {useEffect, useState} from "react";
import getAds from "../../../../services/getAds";
import AdContainer from "./AdContainer";
import {input} from "@/src/styles/input";
import {SvgXml} from "react-native-svg";
import search from "@/assets/icons/filters/search";
import filter from "@/assets/icons/filters/filter";
import sort from "@/assets/icons/filters/sort";
import {AppliedFilters} from "@/src/components/Filter/AppliedFilters";
import ExpertContainerProps from "@/src/types/ExpertContainerProps";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import {useFocusEffect} from "@react-navigation/native";

const AdSection: React.FC<NavigationParameter> = ({ navigation }) => {
    const { allAdData, dataLoading, refetchAllAdData, filters, setFilters } = getAds();
    const [refreshing, setRefreshing] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [searchText, setSearchText] = useState({});
    const [firstFocus, setFirstFocus] = useState(true);

    const refresh = async () => {
        setRefreshing(true);
        await refetchAllAdData();
        setRefreshing(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            if (!firstFocus) {
                refresh();
            } else {
                setFirstFocus(false);
            }
        }, [firstFocus])
    );

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
                            placeholder="Pretraži oglase..."
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
                    {filters && filters.length > 0 &&  <AppliedFilters filters={filters} color={"#ffbf49"}/>}
                </View>
            </View>

            <ScrollView style={styles.scrollViewContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            }>
                {
                    !dataLoading && allAdData && (
                        <>
                            {allAdData.map((ad: any) => (
                                <AdContainer key={ad.id} ad={ad} navigation={navigation} refreshing={refreshing} />
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

export default AdSection;