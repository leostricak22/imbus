import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useState} from 'react';

import Login from './src/components/Login';
import Homepage from './src/components/Homepage/Homepage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    return (
      <View style={styles.container}>
        {
          isLoggedIn ? (
              <Homepage setIsLoggedIn={setIsLoggedIn}/>
              /*<View style={styles.logoutContainer}>
                  <Text style={styles.logoutText} onPress={() => setIsLoggedIn(false)}>
                      ODJAVA
                  </Text>
              </View>*/
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center' 
    },
    logoutContainer: {
    },
    logoutText: {
      fontSize: 18,
      color: 'blue',
    }
});

export default App;
