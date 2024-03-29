import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useState} from 'react';

import Login from './src/components/Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    return (
        <View style={styles.container}>
          {isLoggedIn ? (
            <View style={styles.logoutContainer}>
                <Text style={styles.logoutText} onPress={() => setIsLoggedIn(false)}>
                    ODJAVA
                </Text>
            </View>
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
