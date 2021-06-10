import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import ControlDevice from './screens/ControlDevice.js';
import ChooseRoom from './screens/ChooseRoom.js';
import AddDevice from './components/AddDevice.js'
import FanControl from './screens/FanControl.js';
import SensorControl from './screens/SensorControl.js'
import SignIn from './screens/SignIn.js'
import Account from './screens/Account.js'
import SignUp from './screens/SignUp.js'
import RegisterRoom from './screens/RegisterRoom'
import LoadingScreenSignIn from './screens/AppSwitchNavigator/LoadingScreenSignIn'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// ----------------- FIREBASE -------------------------
import firebase from 'firebase/app'
import { firebaseConfig } from './firebase/firebase.js'
// ---------------------NAVIGATOR----------------------
const StackScreen = createStackNavigator();

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
}
