import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getJobs from "@/src/services/offer/getJobs";
import Jobs from "@/src/components/Jobs/Jobs";
import JobsProps from "@/src/types/jobs/JobsProps";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";

LocaleConfig.locales['hr'] = {
    monthNames: ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'],
    monthNamesShort: ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'],
    dayNames: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
    dayNamesShort: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
    today: "Danas"
};

LocaleConfig.defaultLocale = 'hr';

const CalendarEvents: React.FC<NavigationParameter> = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [events, setEvents] = useState([]);
    const { jobs, refetchJobs, loading } = getJobs();

    const borderColors = {"1": "#ff0000", "2": "#6750a4", "3": "#00ff29", "4": "#ff00f7"};
    let colorIndex = 0;
    const colorKeys = Object.keys(borderColors);

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}.${month}.${year}.`;
    };

    const disabledSundays = () => {
        const dates = {};
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const numMonths = 12;

        for (let month = 0; month < numMonths; month++) {
            const numDays = new Date(year, month + 1, 0).getDate();
            for (let day = 1; day <= numDays; day++) {
                const date = new Date(year, month, day);
                if (date.getDay() === 1) {
                    const dateString = date.toISOString().split('T')[0];
                    // @ts-ignore
                    dates[dateString] = { disabled: true, textColor: 'red' };
                }
            }
        }
        return dates;
    };

    useEffect(() => {
        const dates = { ...disabledSundays() };
        setMarkedDates(dates);
    }, []);

    useEffect(() => {
        const jobDates = jobs.reduce((acc, job) => {
            const date = job.date.split('T')[0];
            // @ts-ignore
            const color = borderColors[colorKeys[colorIndex % colorKeys.length]];
            colorIndex++;

            // @ts-ignore
            if (acc[date]) {
                // @ts-ignore
                acc[date].dots.push({ key: job.id, color });
            } else {
                // @ts-ignore
                acc[date] = { dots: [{ key: job.id, color }] };
            }
            return acc;
        }, {});

        setMarkedDates(prevMarkedDates => ({ ...prevMarkedDates, ...jobDates }));
    }, [jobs]);

    const allMarkedDates = { ...markedDates };
    if (selectedDate) {
        // @ts-ignore
        allMarkedDates[selectedDate] = { selected: true, color: '#FFBF49', textColor: 'white' };
    }

    const eventData = [
        { date: '2024-06-13', time: '8:00', location: 'Zagreb, Dubrava' },
        { date: '2024-06-13', time: '13:30', location: 'Zagreb, Ravnice' },
        { date: '2024-06-13', time: '17:00', location: 'Zagreb, Ravnice' },
    ];

    const getEventsForDate = (date: string) => {
        return eventData.filter(event => event.date === date);
    };

    const formattedDate = selectedDate ? formatDate(selectedDate) : '';


    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate]);

    // @ts-ignore
    return (
        <View style={styles.container}>
            <Calendar
                current={'2024-06-09'}
                minDate={'2023-05-10'}
                maxDate={'2025-05-30'}
                markingType={'multi-dot'}
                markedDates={allMarkedDates}
                monthFormat={'yyyy MM'}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    const eventsForSelectedDate = getEventsForDate(day.dateString);
                }}
                hideExtraDays={false}
                enableSwipeMonths={true}
                pastScrollRange={0}
                futureScrollRange={6}
                horizontal={true}
                firstDay={1}
                disableAllTouchEventsForDisabledDays={true}
                theme={{
                    textDayFontWeight: '500',
                    textSectionTitleColor: 'black',
                    arrowColor: 'black',
                    selectedDayBackgroundColor: '#FFBF49',
                    selectedDayTextColor: 'white',
                    todayTextColor: '#000',
                }}
                renderHeader={(date) => {
                    const monthName = date.toString('MMMM yyyy');
                    return (
                        <View>
                            <Text style={styles.month}>{monthName}.</Text>
                        </View>
                    );
                }}
            />

            <Text style={styles.dateText}>{formattedDate}</Text>

            <View style={styles.jobsContainer}>
                {selectedDate && <Jobs date={new Date(selectedDate).toISOString()} jobs={jobs} navigation={navigation} />}
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    month: {
        fontSize: 20
    },
    eventsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    iconContainer: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    eventText: {
        fontSize: 16,
    },

    dateText: {
        fontFamily: 'Roboto',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20
    },
    jobsContainer: {
        flex: 1,
        flexDirection: "column",
        marginTop: 20,
    }
});

export default CalendarEvents;
