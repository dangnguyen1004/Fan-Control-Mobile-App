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



function App(props) {
   const [selectedBlock, setSelectedBlock] = useState()
   return (
	   <NavigationContainer>
         <AuthNavigator></AuthNavigator>
	   </NavigationContainer>
	);
}

const styles = StyleSheet.create({
   container: {

   },
});

export default App;