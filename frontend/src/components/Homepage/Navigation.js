import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';

homepageImage = require("../../../assets/icons/homepage.png");
postsImage = require("../../../assets/icons/posts.png");
messagesImage = require("../../../assets/icons/messages.png");
specialistsImage = require("../../../assets/icons/specialists.png");

export default function Navigation() {
    const [selectedSection, setSelectedSection] = useState(0); 

    return (
        <View style={styles.container}>
            <Pressable style={styles.section} onPressIn={() => {setSelectedSection(0); console.log(selectedSection);}}>
                <Image source={homepageImage} style={styles.sectionImage} />
                <Text style={styles.sectionText}>Naslovnica</Text>
            </Pressable>
            <Pressable style={styles.section} onPressIn={() => {setSelectedSection(1); console.log(selectedSection);}}>
                <Image source={postsImage} style={styles.sectionImage} />
                <Text style={styles.sectionText}>Naslovnica</Text>
            </Pressable>
            <Pressable style={styles.section} onPressIn={() => {setSelectedSection(2); console.log(selectedSection);}}>
                <Image source={messagesImage} style={styles.sectionImage} />
                <Text style={styles.sectionText}>Poruke</Text>
            </Pressable>
            <Pressable style={styles.section} onPressIn={() => {setSelectedSection(3); console.log(selectedSection);}}>
                <Image source={specialistsImage} style={styles.sectionImage} />
                <Text style={styles.sectionText}>Znalci</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#dce3de',
        borderBottomStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionImage: {
        width: 50,
        height: 50,
    },
    sectionText: {
        fontSize: 12,
    }
});