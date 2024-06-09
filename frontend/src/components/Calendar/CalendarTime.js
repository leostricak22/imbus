import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const App = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [selectedTime, setSelectedTime] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const disabledDate = {
        '2024-06-07': { disabled: true },
        '2024-06-10': { disabled: true },
        '2024-06-15': { disabled: true },
        '2024-06-21': { disabled: true },
        '2024-06-23': { disabled: true },
        '2024-06-24': { disabled: true },
        '2024-06-25': { disabled: true },
        '2024-06-28': { disabled: true },
        '2024-06-30': { disabled: true }
    };

    const formatDate = (dateString) => {
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
                    dates[dateString] = { disabled: true, textColor: 'red' };
                }
            }
        }
        return dates;
    };

    useEffect(() => {
        const dates = { ...disabledDate, ...disabledSundays() };
        setMarkedDates(dates);
    }, []);

    const allMarkedDates = { ...markedDates };
    if (selectedDate) {
        allMarkedDates[selectedDate] = { selected: true, color: '#FFBF49', textColor: 'white' };
    }

    const timeOptions = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    const unavailableTimes = {
        "08:00": true,
        "09:00": false,
        "10:00": false,
        "11:00": true,
        "12:00": false,
        "13:00": true,
        "14:00": false,
        "15:00": false,
        "16:00": true,
        "17:00": false,
        "18:00": false
    };

    return (
        <View style={styles.container}>
            <Calendar
                current={'2024-06-09'}
                minDate={'2023-05-10'}
                maxDate={'2025-05-30'}
                markingType={'period'}
                markedDates={allMarkedDates}
                monthFormat={'yyyy MM'}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);

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
                    'stylesheet.calendar.header': {
                        dayTextAtIndex6: {
                            color: 'red'
                        },
                    },
                    arrowColor: 'black',

                }}
                renderHeader={(date) => {
                    const monthName = date.toString('MMMM yyyy');
                    return (
                        <View style={styles.header}>
                            <Text style={styles.month}>{monthName}</Text>
                        </View>
                    );
                }}
            />
            {selectedDate && (
                <TouchableOpacity style={styles.dropdownContainer} onPress={() => setModalVisible(true)}>
                    <View style={styles.iconContainer}>
                        <Icon name="schedule" size={24} color="#000" />
                    </View>
                    <Text style={styles.dropdownText}>{selectedTime ? selectedTime : "Odaberite vrijeme"}</Text>
                    <View style={styles.iconContainer}>
                        <Icon name="arrow-drop-down" size={24} color="#000" />
                    </View>
                </TouchableOpacity>
            )}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={timeOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.modalItem,
                                        unavailableTimes[item] ? styles.unavailableItem : null
                                    ]}
                                    onPress={() => {
                                        if (!unavailableTimes[item]) {
                                            setSelectedTime(item);
                                            setModalVisible(false);
                                        }
                                    }}
                                >
                                    <Text style={styles.modalItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Zatvori</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 15,
        width: 330,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 100,
        marginVertical: 20,
        alignSelf: 'center',
    },
    dropdownText: {
        flex: 1,
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#000000',
        textAlign: 'left',
    },
    iconContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 20,
        borderRadius: 10,
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    modalItemText: {
        fontSize: 18,
    },
    unavailableItem: {
        opacity: 0.2,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
    },
});

export default App;