import React from 'react';
import { StyleSheet, View,LogBox,ActivityIndicator } from 'react-native';
import { isLoading, useFonts } from 'expo-font';
import firebase from '@firebase/app';
import 'firebase/auth';
import '@firebase/firestore';
import { NavigationContainer } from "@react-navigation/native";
import {firebaseConfig} from './config/firebaseConfig';
import {AppNavigator, AuthenticationNavigator} from './routes/homeStack';
import * as SecureStore from 'expo-secure-store';
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
   const [loading,setLoading] = React.useState(true)
   const [authenticated,setAuthentication] = React.useState(false)
   let [fontsLoaded] = useFonts({
      'Mulish-Bold' : require('./assets/fonts/Mulish-Bold.ttf'),
      'Mulish-Medium' : require('./assets/fonts/Mulish-Medium.ttf'),
      'Mulish-Regular' : require('./assets/fonts/Mulish-Regular.ttf'),
      'Mulish-SemiBold' : require('./assets/fonts/Mulish-SemiBold.ttf'),
  });
   // Initialize Firebase
   if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
   }
   else {
   firebase.app(); // if already initialized, use that one
   };

   React.useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setAuthentication(true)
          })
          .catch((error) => {
            setLoading(false)
            setAuthentication(false)
          });
      } else {
         setLoading(false)
         setAuthentication(false)
      }
    });
  }, []);

   if (!fontsLoaded || loading) {
      return (
         <View style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
             <ActivityIndicator size={100}  animating={!fontsLoaded || loading ? true: false}/>
         </View>
      )
   }
   else
   {
   return(
      <View style ={styles.container}>
         <NavigationContainer>
       {(authenticated) ? (
            <AppNavigator/>
       ) : (
            <AuthenticationNavigator/>
       )
      }
         </NavigationContainer>
      </View>
   )
   }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});