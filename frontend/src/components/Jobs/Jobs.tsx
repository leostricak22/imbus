import React, {useEffect} from "react";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import JobsProps from "@/src/types/jobs/JobsProps";
import {View, StyleSheet, Text, ActivityIndicator, Pressable} from "react-native";
import {SvgXml} from "react-native-svg";
import schedule from "@/assets/icons/calendar/schedule";
import location from "@/assets/icons/offer/location";
import {counties} from "@/src/data/Counties";
import getJobs from "@/src/services/offer/getJobs";
import {isLoading} from "expo-font";


export const Jobs: React.FC<JobsProps> = ({ navigation, date, refreshing, noEventsMessage="Nema poslova za taj dan." }) => {
    const { jobs, refetchJobs, loading  } = getJobs();

    const jobsList = jobs.filter(job => job.date.split('T')[0] === date.split('T')[0]);
    const borderColors = {"1": "#ff0000", "2": "#6750a4", "3": "#00ff29", "4": "#ff00f7"};

    useEffect(() => {
        if(refreshing)
            refetchJobs();
    }, [refreshing]);

    function getTimeFromISOString(isoString: string) {
        const timePart = isoString.split('T')[1];
        const [hh, mm] = timePart.split(':');

        return `${hh}:${mm}`;
    }

    return (
        <View style={styles.container}>
            {
                loading ? <ActivityIndicator size="large" color="#0478ca" />:
                jobsList.length === 0 ? <Text>{noEventsMessage}</Text> :
                jobsList.map((job, index) => (
                    // @ts-ignore
                    <Pressable key={index} style={[styles.jobContainer, { borderColor: borderColors[(index+1)%3] }]}
                        onPress={() => navigation.navigate('view-ad', { ad: job.ad })}
                    >
                        <View style={styles.jobItem}>
                            <View style={styles.icon}>
                                <SvgXml width="85%" height="85%" xml={schedule}/>
                            </View>
                            <Text style={styles.jobText}>{getTimeFromISOString(job.date)}</Text>
                        </View>
                        <View style={styles.jobItem}>
                            <View style={styles.icon}>
                                <SvgXml width="85%" height="85%" xml={location}/>
                            </View>
                            <Text style={styles.jobText}> {counties.find(item => job.ad.location == item.value)?.label || 'Nepoznato'}</Text>
                        </View>
                    </Pressable>
                ))
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 130,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    jobContainer: {
        width: '90%',
        padding: 15,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    jobItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    jobText: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'center',
    }
});

export default Jobs;