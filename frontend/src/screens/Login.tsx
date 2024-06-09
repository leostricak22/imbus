import { StyleSheet, View, Text, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const textLogoImage = require("../../assets/icons/imbusTextLogo.png");

import envVars from "@/src/utils/envVars";
import {NavigationParameter} from "@/src/types/navigation/NavigationParameter";
import {SvgXml} from "react-native-svg";

import logo from "@/assets/icons/logo";
import mail from "@/assets/icons/login/mail";
import visibility from "@/assets/icons/login/visibility";
import lock from "@/assets/icons/login/lock";
import facebook from "@/assets/icons/companies/facebook";
import google from "@/assets/icons/companies/google";
import useKeyboard from "@/src/hooks/useKeyboard";

import {button} from "@/src/styles/button";
import {colors} from "@/src/styles/colors";
import {input} from "@/src/styles/input";

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
    console.log(`${envVars.API_ENDPOINT}/api/auth/authenticate`)
    try {
      const response = await fetch(`${envVars.API_ENDPOINT}/api/auth/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      await AsyncStorage.setItem('token', data.token);

      navigation.navigate('homepage');
    } catch (error) {
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
          <Text style={[colors.red, {marginBottom:5}]}>{error}</Text>
          <View style={input.inputContainer}>
            <View style={input.inputIcon}>
              <SvgXml
                  width="100%"
                  height="100%"
                  xml={mail}
              />
            </View>
            <TextInput
                style={input.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />
          </View>

          <View style={input.inputContainer}>
            <View style={input.inputIcon}>
              <SvgXml
                  width="100%"
                  height="100%"
                  xml={lock}
              />
            </View>
            <TextInput
                style={input.inputShowHide}
                value={password}
                onChangeText={setPassword}
                placeholder="Lozinka"
                secureTextEntry={isPasswordHidden}
            />
            <Pressable style={input.inputIcon}
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
              style={[button.buttonContainer, hoverStates.login ? colors.backgroundDarkBlue : colors.backgroundBlue]}
              onPress={handleLogin}
              onPressIn={() => setHoverStateTrue("login")}
              onPressOut={() => setHoverStateFalse("login")}
          >
            <Text style={button.buttonText}>Prijava</Text>
          </Pressable>

          <Text style={styles.smallText}>ili</Text>

          <Pressable
              style={[button.buttonContainer, styles.borderBlack,
                hoverStates.thirdParty1 ? colors.backgroundGray : colors.backgroundWhite]}
              onPress={handleLogin}
              onPressIn={() => setHoverStateTrue('thirdParty1')}
              onPressOut={() => setHoverStateFalse('thirdParty1')}
          >
            <View style={button.buttonIcon}>
              <SvgXml xml={facebook} width="100%" height="100%" />
            </View>
            <Text style={[button.buttonText, colors.black]}>Facebook</Text>
          </Pressable>

          <Pressable
              style={[button.buttonContainer, styles.borderBlack,
                hoverStates.thirdParty2 ? colors.backgroundGray : colors.backgroundWhite]}
              onPress={handleLogin}
              onPressIn={() => setHoverStateTrue('thirdParty2')}
              onPressOut={() => setHoverStateFalse('thirdParty2')}
          >
            <View style={button.buttonIcon}>
              <SvgXml xml={google} width="100%" height="100%" />
            </View>
            <Text style={[button.buttonText, colors.black]}>Google</Text>
          </Pressable>
        </View>
        {
          keyboardVisible ? null : (
              <View style={styles.noAccountContainer}>
                <Text style={styles.smallText}>Nemaš račun?</Text>
                <Pressable style={[button.buttonContainer, styles.spaceTop, hoverStates.register ? colors.backgroundDarkOrange : colors.backgroundOrange]}
                           onPress={() => navigation.navigate('register')}
                           onPressIn={() => setHoverStateTrue('register')}
                           onPressOut={() => setHoverStateFalse('register')}
                >

                  <Text style={button.buttonText}>Registracija</Text>
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
  noAccountContainer: {
    position: 'absolute',
    bottom: 10,
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  borderBlack: {
    borderColor: '#000',
    borderWidth: 1,
  },
});
