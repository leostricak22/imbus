import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

import Header from './Header';
import Navigation from './Navigation';
import HomepageSection from './Section/HomepageSection';
import ExpertsSection from './Section/Expert/ExpertsSection';

import useTokenValidation from '../../hooks/useTokenValidation';
export default function Homepage({navigation}) {
    const [selectedSection, setSelectedSection] = useState(0);
    const validToken = useTokenValidation();

    useEffect(() => {
        console.log('Section changed to:', selectedSection);
    }, [selectedSection]);

    useEffect(() => {
        if (validToken !== '' && !validToken) {
            navigation.navigate('login');
        }
    }, [validToken, navigation]);

    return (
        <View style={styles.container}>
            <Header/>
            {
                selectedSection === 0 ? (
                    <HomepageSection></HomepageSection>
                ) : selectedSection === 1 ? (
                    <Text>Posts</Text>
                ) : selectedSection === 2 ? (
                    <Text>Messages</Text>
                ) : (
                    <ExpertsSection></ExpertsSection>
                )
            }
            <View style={styles.navigation}>
                <Navigation selectedSection={selectedSection} setSelectedSection={setSelectedSection}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    navigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});