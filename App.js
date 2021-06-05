import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from './components/AppButton';
import InputField from './components/InputField';
import TextButton from './components/TextButton';
import AccountScreen from './screens/AccountScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

function App(props) {
   return (
      <AccountScreen></AccountScreen>
   );
}

const styles = StyleSheet.create({
   container: {

   },
});

export default App;