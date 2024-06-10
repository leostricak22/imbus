import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import FormProps from "@/src/types/form/FormProps";
import getJobs from "@/src/services/offer/getJobs";

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

const CalendarMultipleDays : React.FC<CalendarMultipleDaysProps>  = ({firstDate, secondDate, setFirstDate, setSecondDate}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});

    const onDayPress = (day: { dateString: any; }) => {
        const selected = day.dateString;

        if (!firstDate) {
            setFirstDate(selected);
            const newMarkedDates = { ...markedDates, [selected]: { startingDay: true, color: '#0478ca', textColor: 'white' } };
            setMarkedDates(newMarkedDates);
        } else if (!secondDate) {
            setSecondDate(selected);
            const newMarkedDates = { ...markedDates, [selected]: { endingDay: true, color: '#0478ca', selected: true, textColor: 'white' } };
            setMarkedDates(newMarkedDates);
        } else {
            setFirstDate('');
            setSecondDate('');
            setMarkedDates({ ...disabledDate, ...disabledSundays() });
        }

        setSelectedDate(selected);
    };

    const disabledDate = {
        /*'2024-06-07': { disabled: true },
        '2024-06-10': { disabled: true },
        '2024-06-15': { disabled: true },
        '2024-06-21': { disabled: true },
        '2024-06-23': { disabled: true },
        '2024-06-24': { disabled: true },
        '2024-06-25': { disabled: true },
        '2024-06-28': { disabled: true },
        '2024-06-30': { disabled: true },*/
    };



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
                    dates[dateString] = { disabled: false, textColor: 'red' };
                }
            }
        }
        return dates;
    };

    useEffect(() => {
        const dates = { ...disabledDate, ...disabledSundays() };
        setMarkedDates(dates);
    }, []);

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
                <Text style={styles.text}>{firstDate && secondDate ? `${formatDate(firstDate)} - ${formatDate(secondDate)}` : ''}</Text>
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
        width: 360,
        height: 44,
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

export default CalendarMultipleDays;