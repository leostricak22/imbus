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
import Filter from "../Filter/Filter";
import React, {useEffect, useState} from "react";
import getAds from "../../services/ad/getAds";
import {input} from "@/src/styles/input";
import {SvgXml} from "react-native-svg";
import search from "@/assets/icons/filters/search";
import filter from "@/assets/icons/filters/filter";
import sort from "@/assets/icons/filters/sort";
import {AppliedFilters} from "@/src/components/Filter/AppliedFilters";
import ExpertContainerProps from "@/src/types/expert/ExpertContainerProps";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {useFocusEffect} from "@react-navigation/native";
import getSmallFixes from "@/src/services/smallfixes/getSmallFixes";
import SmallFixesContainer from "@/src/components/SmallFixes/SmallFixesContainer";

const SmallFixesSection: React.FC<NavigationParameter> = ({ navigation, role }) => {
    const { allSmallFixesData, dataLoading, refetchAllSmallFixesData, filters, setFilters } = getSmallFixes();
    const [refreshing, setRefreshing] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [searchText, setSearchText] = useState({});
    const [firstFocus, setFirstFocus] = useState(true);

    const refresh = async () => {
        setRefreshing(true);
        await refetchAllSmallFixesData();
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
            <ScrollView style={styles.scrollViewContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            }>
                {
                    !dataLoading && allSmallFixesData && (
                        <>
                            {allSmallFixesData.map((smallFixes: any) => (
                                <SmallFixesContainer key={smallFixes.id} smallFixes={smallFixes} navigation={navigation} refreshing={refreshing} role={role} />
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

export default SmallFixesSection;