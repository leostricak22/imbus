import {
    ActivityIndicator,
    Button, Image,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Modal, TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAllExpertData from "../../../hooks/useAllExpertData";
import Filter from "../../Filter/Filter";

export default function HomepageSection({ navigation }) {
    const { allExpertData, dataLoading, refetchAllExpertData } = useAllExpertData();
    const [refreshing, setRefreshing] = useState(false);
    const [showFilter, setShowFilter] = useState(false); // State to control filter section visibility

    const onRefresh = async () => {
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
                <Filter setShowFilter={setShowFilter}></Filter>
            </Modal>

            <View style={styles.filterContainer}>
                <TextInput style={styles.input} placeholder="Pretraži znalce..."></TextInput>
                <View style={styles.filterIconsContainer}>
                    <Pressable onPress={() => setShowFilter(true)}>
                        <Image source={require('../../../../assets/icons/filter.png')} style={{ width: 25, height: 25 }} />
                    </Pressable>
                    <Pressable>
                        <Image source={require('../../../../assets/icons/list.png')} style={{ width: 25, height: 25 }} />
                    </Pressable>
                </View>
            </View>

            <ScrollView style={styles.scrollViewContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {
                    dataLoading || !allExpertData ? (
                        <ActivityIndicator size="large" color="#209cee" />
                    ) : (
                        <>
                            {allExpertData.map(expert => (
                                <View key={expert.id} style={styles.itemContainer}>
                                    <Text style={styles.text}>Name: {expert.name}</Text>
                                    <Text style={styles.text}>Surname: {expert.surname}</Text>
                                    <Text style={styles.text}>Username: {expert.username}</Text>
                                    <Text style={styles.text}>Location: {expert.location}</Text>
                                    <Text style={styles.text}>Categories: {expert.categories.join(', ')}</Text>
                                </View>
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
