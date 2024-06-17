import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['hr'] = {
    monthNames: [
        'Siječanj',
        'Veljača',
        'Ožujak',
        'Travanj',
        'Svibanj',
        'Lipanj',
        'Srpanj',
        'Kolovoz',
        'Rujan',
        'Listopad',
        'Studeni',
        'Prosinac'
    ],
    monthNamesShort: ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'],
    dayNames: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
    dayNamesShort: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
    today: "Danas"
};

LocaleConfig.defaultLocale = 'hr';

const CalendarMultipleDays : React.FC<CalendarMultipleDaysProps> = ({ firstDate, secondDate, setFirstDate, setSecondDate }) => {
    const [markedDates, setMarkedDates] = useState({});

    const onDayPress = (day: { dateString: any; }) => {
        const selected = day.dateString;

        if (!firstDate) {
            setFirstDate(selected);
            const newMarkedDates = { [selected]: { startingDay: true, color: '#0478ca', textColor: 'white' } };
            setMarkedDates(newMarkedDates);
        } else if (!secondDate) {
            setSecondDate(selected);
            markRangeDates(firstDate, selected);
        } else {
            setFirstDate('');
            setSecondDate('');
            setMarkedDates({});
        }
    };

    const markRangeDates = (start: string | number | Date, end: string | number | Date) => {
        let dates = {};
        let currentDate = new Date(start);
        const endDate = new Date(end);

        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            // @ts-ignore
            dates[dateString] = { color: '#0478ca', textColor: 'white' };
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // @ts-ignore
        dates[start] = { startingDay: true, color: '#0478ca', textColor: 'white' };
        // @ts-ignore
        dates[end] = { endingDay: true, color: '#0478ca', textColor: 'white' };

        setMarkedDates(dates);
    };

    return (
        <View style={styles.container}>
            <Calendar
                current={'2024-06-09'}
                minDate={'2023-05-10'}
                maxDate={'2025-05-30'}
                onDayPress={onDayPress}
                markingType={'period'}
                markedDates={markedDates}
                monthFormat={'yyyy MM'}
                onMonthChange={(month) => {
                    console.log('month changed', month);
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
                            <Text style={styles.month}>{monthName}</Text>
                        </View>
                    );
                }}
            />
            <View style={styles.box}>
                <Text style={styles.text}>
                    {firstDate && secondDate ? `${formatDate(firstDate)} - ${formatDate(secondDate)}` : ''}
                </Text>
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
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 15,
        marginHorizontal: 'auto',
        marginVertical: 40,
        width: '100%',
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 30
    },
    text: {
        width: 290,
        height: 16,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'center',
        color: '#000000',
    },
});

const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}.`;
};

export default CalendarMultipleDays;
