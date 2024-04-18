import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';

const homepageImage = require("../../../assets/icons/homepage/homepage.png");
const homepageSelectedImage = require("../../../assets/icons/homepage/homepageSelected.png");

const postsImage = require("../../../assets/icons/homepage/posts.png");
const postsSelectedImage = require("../../../assets/icons/homepage/postsSelected.png");

const messagesImage = require("../../../assets/icons/homepage/messages.png");
const messagesSelectedImage = require("../../../assets/icons/homepage/messagesSelected.png");

const specialistsImage = require("../../../assets/icons/homepage/specialists.png");
const specialistsSelectedImage = require("../../../assets/icons/homepage/specialistsSelected.png");

export default function Navigation({ selectedSection, setSelectedSection }) {
    const [buttonAddIsHovered, setButtonAddIsHovered] = useState(false);

    return (
        <View style={styles.navigation}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View
                        style={{
                            position: 'absolute',
                            height: 100,
                            width: '39%',
                            left: 0,
                            backgroundColor: 'white',
                            borderTopWidth: 1,
                            borderTopColor: '#d5d5d5',
                            borderTopStyle: 'solid',
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: -51,
                            left: '36%',
                            width: '20%',
                            height: 50,
                            borderBottomWidth: 12,
                            borderLeftWidth: 12,
                            borderColor: 'white',
                            borderBottomLeftRadius: 100,
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: -51,
                            right: "36%",
                            width: '20%',
                            height: 50,
                            borderBottomWidth: 12,
                            borderRightWidth: 12,
                            borderColor: 'white',
                            borderBottomRightRadius: 100,
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            height: 100,
                            width: "39%",
                            backgroundColor: 'white',
                            borderTopWidth: 1,
                            borderTopColor: '#d5d5d5',
                            borderTopStyle: 'solid',
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            height: 50,
                            width: '100%',
                            top: 40,
                            left: 0,
                            backgroundColor: 'white',
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            height: 50,
                            width: 50,
                            top: 25,
                            left: "30%",
                            backgroundColor: 'white',
                            transform: [{ rotate: '45deg' }],
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            height: 50,
                            width: 50,
                            top: 25,
                            right: "30%",
                            backgroundColor: 'white',
                            transform: [{ rotate: '45deg' }],
                        }}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.navigationLeftSide}>
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(0);}}>
                        <Image source={selectedSection == 0 ? homepageSelectedImage : homepageImage} style={styles.sectionImage} />
                        <Text style={[styles.sectionText, selectedSection == 0 ? styles.blue : styles.gray]}>Naslovnica</Text>
                    </Pressable>
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(1);}}>
                        <Image source={selectedSection == 1 ? postsSelectedImage : postsImage} style={styles.sectionImage} />
                        <Text style={[styles.sectionText, selectedSection == 1 ? styles.blue : styles.gray]}>Objave</Text>
                    </Pressable>
                </View>                
                <View style={styles.navigationRightSide}>
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(2);}}>
                        <Image source={selectedSection == 2 ? messagesSelectedImage : messagesImage} style={styles.sectionImage} />
                        <Text style={[styles.sectionText, selectedSection == 2 ? styles.blue : styles.gray]}>Poruke</Text>
                    </Pressable>
                    <Pressable style={styles.section} onPress={() => {setSelectedSection(3);}}>
                        <Image source={selectedSection == 3 ? specialistsSelectedImage : specialistsImage} style={styles.sectionImage} />
                        <Text style={[styles.sectionText, selectedSection == 3 ? styles.blue : styles.gray]}>Znalci</Text>
                    </Pressable>
                </View>
            </View>
            <Pressable style={[styles.circleButton, buttonAddIsHovered ? styles.backgroundDarkBlue : styles.backgroundBlue]}
                onPressIn={() => setButtonAddIsHovered(true)}
                onPressOut={() => setButtonAddIsHovered(false)}
            >
                <View style={styles.plusLineHorizontal} />
                <View style={styles.plusLineVertical} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        width: '100%',
        height: 90,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        zIndex: 1,
    },
    navigationLeftSide: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    navigationRightSide: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    circleButton: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 4,
        backgroundColor: '#209cee',
        left: '50%',
        bottom: 55,
        zIndex: 3,
        transform: [{ translateX: -35 }],
    },
    plusLineHorizontal: {
        position: 'absolute',
        width: 30,
        height: 4,
        backgroundColor: 'white',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -2 }],
    },
    plusLineVertical: {
        position: 'absolute',
        width: 4,
        height: 30,
        backgroundColor: 'white',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -2 }, { translateY: -15 }],        
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    sectionImage: {
        width: 50,
        height: 50,
    },
    sectionText: {
        marginTop: 5,
        fontSize: 12,
    },
    blue: {
        color:"#209cee",
    },
    gray: {
        color: "#b3b3b3",
    },
    backgroundBlue: {
        backgroundColor: '#209cee',
    },
    backgroundDarkBlue: {
        backgroundColor: '#085e96',
    },
});