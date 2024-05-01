import {
    View,
    StyleSheet,
    Text,
    Modal,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from "react-native";
import Filter from "../../../Filter/Filter";
import ExpertContainer from "../Expert/ExpertContainer";
import {useEffect, useState} from "react";
import useAllAdData from "../../../../hooks/useAllAdData";
import AdContainer from "./AdContainer";

export default function AdSection({navigation}) {
    const { allAdData, dataLoading, refetchAllAdData, filters, setFilters } = useAllAdData();
    const [refreshing, setRefreshing] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const refresh = async () => {
        setRefreshing(true);
        await refetchAllAdData();
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
                <TextInput style={styles.input} placeholder="Pretraži oglase..."></TextInput>
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
                    dataLoading || !allAdData ? (
                        <ActivityIndicator size="large" color="#209cee" />
                    ) : (
                        <>
                            {allAdData.map(ad => (
                                <AdContainer ad={ad} navigation={navigation} />
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
