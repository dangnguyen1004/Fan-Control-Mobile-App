import React from 'react';
import { TextInput } from 'react-native';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,ScrollView,Text,Button,LogBox } from 'react-native';
import { processFontFamily, useFonts } from 'expo-font';
import Account from './screens/Account';
import AccountProfile from './screens/AccountProfile';
import {SignIn} from './screens/SignIn';
import SignUp from './screens/SignUp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '@firebase/app';
import RegisterRoom from './screens/RegisterRoom';
import { AppNavigator } from './routes/homeStack';
import { MainNavigator} from './routes/mainStack';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import {firebaseConfig} from './config/firebaseConfig';
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
   const [authenticationReady,setAuthenticationReady] = React.useState(false)
   const [authenticated,setAuthentication] = React.useState(false)
   const [user,setUser] = React.useState({})
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

//    React.useEffect(() => {
//     const usersRef = firebase.firestore().collection('users');
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         usersRef
//           .doc(user.uid)
//           .get()
//           .then((document) => {
//             const userData = document.data()
//             setAuthentication(true)
//             setUser(userData)
//           })
//           .catch((error) => {
//             setAuthentication(false)
//           });
//       } else {
//         setAuthentication(false)
//       }
//     });
//   }, []);
   if (!fontsLoaded) {
      return <Text>Hello</Text>
   }
   else
   {
   return(
      <View style ={styles.container}>
       {(authenticated) ? <MainNavigator/> : <AppNavigator/>}
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