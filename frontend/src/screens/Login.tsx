import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const textLogoImage = require("../../assets/icons/imbusTextLogo.png");

import envVars from "@/src/utils/envVars";
import {NavigationParameter} from "@/src/types/NavigationParameter";
import {SvgXml} from "react-native-svg";

import logo from "@/assets/icons/logo";
import mail from "@/assets/icons/login/mail";
import visibility from "@/assets/icons/login/visibility";
import lock from "@/assets/icons/login/lock";
import facebook from "@/assets/icons/companies/facebook";
import google from "@/assets/icons/companies/google";
import useKeyboard from "@/src/hooks/useKeyboard";

export const Login: React.FC<NavigationParameter> = ({ navigation }) => {
  const [hoverStates, setHoverStates] = useState({
    login: false,
    thirdParty1: false,
    thirdParty2: false,
    register: false,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const keyboardVisible = useKeyboard();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${envVars.API_ENDPOINT}/api/auth/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      console.log(data);

      await AsyncStorage.setItem('token', data.token);

      navigation.navigate('homepage');
    } catch (error) {
      console.log(error);
      setError("Pogrešno korisničko ime ili lozinka!");
    }
  };

  const setHoverStateTrue = (key: any) => {
    setHoverStates(prevState => ({ ...prevState, [key]: true }));
  }

  const setHoverStateFalse = (key: any) => {
    setHoverStates(prevState => ({ ...prevState, [key]: false }));
  }

  return (
      <View style={styles.container}>
        <View style={styles.logoImagesContainer}>
          <View style={styles.logoImageContainer}>
            <SvgXml
                width="100%"
                height="100%"
                xml={logo}
            />
          </View>

          <View style={styles.textLogoImageWrapper}>
            <Image source={textLogoImage} style={styles.textLogoImage} />
          </View>
        </View>

        <View style={styles.loginForm}>
          <Text style={[styles.red, {marginBottom:5}]}>{error}</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <SvgXml
                  width="100%"
                  height="100%"
                  xml={mail}
              />
            </View>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                placeholderTextColor="#000"
                keyboardType="email-address"
                autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <SvgXml
                  width="100%"
                  height="100%"
                  xml={lock}
              />
            </View>
            <TextInput
                style={styles.inputShowHide}
                value={password}
                onChangeText={setPassword}
                placeholder="Lozinka"
                placeholderTextColor="#000"
                secureTextEntry={isPasswordHidden}
            />
            <Pressable style={styles.inputIcon}
                       onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
              <SvgXml
                  width="100%"
                  height="100%"
                  xml={visibility}
              />
            </Pressable>
          </View>

          <Text style={[styles.smallText, styles.spaceBottom, styles.stickToRight]}>Zaboravili ste lozinku?</Text>
          <Pressable
              style={[styles.buttonContainer, hoverStates.login ? styles.backgroundDarkBlue : styles.backgroundBlue]}
              onPress={handleLogin}
              onPressIn={() => setHoverStateTrue("login")}
              onPressOut={() => setHoverStateFalse("login")}
          >
            <Text style={styles.buttonText}>Prijava</Text>
          </Pressable>

          <Text style={styles.smallText}>ili</Text>

          <Pressable
              style={[styles.buttonContainer, styles.borderBlack,
                hoverStates.thirdParty1 ? styles.backgroundGray : styles.backgroundWhite]}
              onPress={handleLogin}
              onPressIn={() => setHoverStateTrue('thirdParty1')}
              onPressOut={() => setHoverStateFalse('thirdParty1')}
          >
            <View style={styles.buttonIcon}>
              <SvgXml xml={facebook} width="100%" height="100%" />
            </View>
            <Text style={[styles.buttonText, styles.black]}>Facebook</Text>
          </Pressable>

          <Pressable
              style={[styles.buttonContainer, styles.borderBlack,
                hoverStates.thirdParty2 ? styles.backgroundGray : styles.backgroundWhite]}
              onPress={handleLogin}
              onPressIn={() => setHoverStateTrue('thirdParty2')}
              onPressOut={() => setHoverStateFalse('thirdParty2')}
          >
            <View style={styles.buttonIcon}>
              <SvgXml xml={google} width="100%" height="100%" />
            </View>
            <Text style={[styles.buttonText, styles.black]}>Google</Text>
          </Pressable>
        </View>
        {
          keyboardVisible ? null : (
              <View style={styles.noAccountContainer}>
                <Text style={styles.smallText}>Nemaš račun?</Text>
                <Pressable style={[styles.buttonContainer, styles.spaceTop, hoverStates.register ? styles.backgroundDarkOrange : styles.backgroundOrange]}
                           onPress={() => navigation.navigate('register')}
                           onPressIn={() => setHoverStateTrue('register')}
                           onPressOut={() => setHoverStateFalse('register')}
                >

                  <Text style={styles.buttonText}>Registracija</Text>
                </Pressable>
              </View>
            )
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoImagesContainer: {
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
  },
  logoImageContainer: {
    width: '100%',
    height: 70,
    marginBottom: 30,
  },
  textLogoImageWrapper: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogoImage: {
    height: '100%',
    width: '90%',

  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  input: {
    width: '85%',
    padding: 10,
    paddingLeft: 0,
    height: 40,
  },
  inputShowHide: {
    width: '65%',
    padding: 10,
    paddingLeft: 0,
    height: 40,
  },
  inputIcon: {
    width: 45,
    padding: 10,
  },
  buttonIcon: {
    width: 45,
    padding: 5,
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
    width: '100%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#0478ca',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noAccountContainer: {
    position: 'absolute',
    bottom: 10,
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  black: {
    color:"#000",
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
  backgroundWhite: {
    backgroundColor: '#fff',
  },
  backgroundGray: {
    backgroundColor: '#c0bbbb',
  },
  backgroundOrange: {
    backgroundColor: '#ffbf49',
  },
  backgroundDarkOrange: {
    backgroundColor: '#e09717',
  },
  borderBlack: {
    borderColor: '#000',
    borderWidth: 1,
  },
});
