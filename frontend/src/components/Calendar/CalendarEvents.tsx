import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

LocaleConfig.locales['hr'] = {
    monthNames: ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'],
    monthNamesShort: ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'],
    dayNames: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
    dayNamesShort: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
    today: "Danas"
};

LocaleConfig.defaultLocale = 'hr';

const CalendarEvents = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [events, setEvents] = useState([]);

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

    return (
        <View style={styles.container}>
            <Calendar
                current={'2024-06-09'}
                minDate={'2023-05-10'}
                maxDate={'2025-05-30'}
                markingType={'multi-dot'}
                markedDates={{
                    ...allMarkedDates,
                    '2024-06-13': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                            { key: 'event3', color: 'green' },
                        ],
                    },
                    '2024-06-29': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                            { key: 'event3', color: 'green' },
                        ],
                    },
                    '2024-06-26': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                        ],
                    },
                    '2024-06-21': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                        ],
                    },
                    '2024-06-18': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                        ],
                    },
                    '2024-06-10': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                        ],
                    },
                    '2024-06-07': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                        ],
                    },
                    '2024-06-05': {
                        dots: [
                            { key: 'event1', color: 'red' },
                        ],
                    },
                    '2024-06-01': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                        ],
                    },
                    '2024-06-28': {
                        dots: [
                            { key: 'event1', color: 'red' },
                            { key: 'event2', color: 'purple' },
                        ],
                    },
                }}
                monthFormat={'yyyy MM'}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    const eventsForSelectedDate = getEventsForDate(day.dateString);
                    // @ts-ignore
                    setEvents(eventsForSelectedDate);
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



            <View style={styles.eventsContainer}>
                {events.map(({location, time}, index) => (
                    <View key={index} style={[styles.eventItem, { borderColor: index === 0 ? 'red' : index === 1 ? 'purple' : 'green' }]}>
                        <Icon name="schedule" size={24} />
                        <View style={{ width: 8 }} />
                        <Text style={styles.eventText}>{time}</Text>
                        <View style={{ width: 10 }} />
                        <Icon name="location-on" size={24} />
                        <View style={{ width: 4 }} />
                        <Text style={styles.eventText}>{location}</Text>
                    </View>
                ))}
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
});

export default CalendarEvents;