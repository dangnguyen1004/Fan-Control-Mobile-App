import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from './components/AppButton';
import AppPicker from './components/AppPicker';
import DeviceItem from './components/DeviceItem';
import InputField from './components/InputField';
import TextButton from './components/TextButton';
import AccountScreen from './screens/AccountScreen';
import AdaAccountScreen from './screens/AdaAccountScreen';
import AddDeviceScreen from './screens/AddDeviceScreen';
import AddRoomScreen from './screens/AddRoomScreen';
import ChooseRoomScreen from './screens/ChooseRoomScreen';
import ControlRoomScreen from './screens/ControlRoomScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AuthNavigator from './navigator/AuthNavigator'
import AppNavigator from './navigator/AppNavigator';
import { useEffect } from 'react';
import firebase from './firebase/connectFirebase'
import PasswordScreen from './screens/PasswordScreen';
import ClientAccountScreen from './screens/ClientAccountScreen';
import ClientChooseRoomScreen from './screens/ClientChooseRoomScreen'
import ClientControlRoomScreen from './screens/ClientControlRoomScreen'
import ClientAppNavigator from './navigator/ClientAppNavigator';
import WelcomeScreen from './screens/WelcomeScreen';


function App(props) {
   const [user, setUser] = useState()

   useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
         setUser(user)
      })
   })

<<<<<<< HEAD
export default class App extends Component {
	constructor() {
		super()
		this.initializeFirebase()
	}
	initializeFirebase = () => {
		firebase.initializeApp(firebaseConfig)
	}
	render() {
		return (
			<NavigationContainer>
				<StackScreen.Navigator screenOptions={{ headerShown: false }}>
					<StackScreen.Screen name="SIGN IN" component={SignIn} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }} ></StackScreen.Screen>
					<StackScreen.Screen name="ACCOUNT" component={Account} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }}></StackScreen.Screen>
					<StackScreen.Screen name="CONTROL DEVICE" component={ControlDevice} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }}></StackScreen.Screen>
					<StackScreen.Screen name="CHOOSE ROOM" component={ChooseRoom} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }}></StackScreen.Screen>
					<StackScreen.Screen name="SIGN UP" component={SignUp} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }}></StackScreen.Screen>
					<StackScreen.Screen name="Loading Screen SignIn" component={LoadingScreenSignIn} title=''></StackScreen.Screen>
					<StackScreen.Screen name="ADD DEVICE" component={AddDevice} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }}></StackScreen.Screen>
					<StackScreen.Screen name="FAN CONTROL" component={FanControl} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }}></StackScreen.Screen>
					<StackScreen.Screen name="SENSOR CONTROL" component={SensorControl} options={{ headerStyle: { backgroundColor: '#007AFF' }, headerTitleStyle: { fontWeight: 'light' }, headerTintColor: 'white' }}></StackScreen.Screen>
				</StackScreen.Navigator>
			</NavigationContainer>
		);
	}
=======
   return (
      <NavigationContainer>
         {user ? (user.email === 'admin@gmail.com' ? <AppNavigator /> : <ClientAppNavigator />) : <AuthNavigator />}
      </NavigationContainer>
      // <WelcomeScreen></WelcomeScreen>
   );
>>>>>>> Enhence-UI
}

const styles = StyleSheet.create({
   container: {

   },
});

export default App;