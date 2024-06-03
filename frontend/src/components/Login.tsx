import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const textLogoImage = require("../../assets/icons/imbusTextLogo.png");
const googleLogoImage = require("../../assets/icons/googleLogo.png");
const facebookLogoImage = require("../../assets/icons/facebookLogo.png");

const backgroundIconsImage = require("../../assets/icons/backgroundIcons.png");
const screwImage = require("../../assets/icons/screw.png");

export default function Login({ navigation }:any) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.54.191:8080/api/auth/authenticate', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('homepage');
    } catch (error) {
      setError("Pogrešno korisničko ime ili lozinka!");
    }
  };

  return (
    <ImageBackground source={backgroundIconsImage} style={styles.imageBackground}>
      <Image source={screwImage} style={styles.backgroundScrewTopLeft} />
      <Image source={screwImage} style={styles.backgroundScrewTopRight} />
      <Image source={screwImage} style={styles.backgroundScrewBottomLeft} />
      <Image source={screwImage} style={styles.backgroundScrewBottomRight} />
      <View style={styles.container}>
        <Image source={textLogoImage} style={styles.textLogoImage} />
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Uz nas nećete biti kao malci!</Text>
          <Text style={styles.subtitleText}>Naši majstori, pravi su <Text style={styles.blue}>znalci!</Text></Text>
        </View>
        <View style={styles.loginForm}>
          <Text style={styles.red}>{error}</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Lozinka"
            secureTextEntry={true}
          />
          <Text style={[styles.smallText, styles.spaceBottom, styles.stickToRight]}>Zaboravljena lozinka?</Text>
          <Pressable
            style={[styles.buttonContainer, isHovered ? styles.backgroundDarkBlue : styles.backgroundBlue]}
            onPress={handleLogin}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
          >
            <Text style={styles.buttonText}>Prijava</Text>
          </Pressable>
          <Text style={styles.smallText}>ili</Text>
          <View style={styles.thirdPartyIconsContainer}>
            <Image source={facebookLogoImage} style={styles.thirdPartyIcon} />
            <Image source={googleLogoImage} style={styles.thirdPartyIcon} />
          </View>

          <Text style={styles.smallText}>Nemaš račun?</Text>
          <Pressable style={[styles.buttonContainer, styles.backgroundBlack, styles.spaceTop]} onPress={() => { console.log("register"); }}>
            <Text style={styles.buttonText}>Registracija</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width:"100%",
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backgroundScrewTopLeft: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 50,
    height: 50,
  },
  backgroundScrewTopRight: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 50,
    height: 50,
  },
  backgroundScrewBottomLeft: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 50,
    height: 50,
  },
  backgroundScrewBottomRight: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 50,
    height: 50,
  },
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textLogoImage: { 
    marginTop: 100,
    width: 250, 
    height: 150,
    resizeMode: 'contain' 
  },
  subtitle: {
    marginBottom: 30,
  },
  subtitleText: {
    fontSize: 18,
  },
  input: {
    width: '90%', 
    padding: 10, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 5, 
    marginBottom: 10,
  },
  smallText: { 
    fontSize: 14, 
  },
  spaceBottom: {
    marginBottom: 10,
  },
  spaceTop: {
    marginTop: 10,
  },
  stickToRight: {
    alignSelf: 'flex-end',
  },
  loginForm: {
    width: '80%', 
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 100,
    width: '60%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#209cee',
    color: 'white',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  thirdPartyIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  thirdPartyIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  blue: {
    color:"#209cee",
  },
  red: {
    color:"#ff0d0d",
  },
  backgroundBlue: {
    backgroundColor: '#209cee',
  },
  backgroundDarkBlue: {
    backgroundColor: '#085e96',
  },
  backgroundBlack: {
    backgroundColor: '#000',
  },
});
