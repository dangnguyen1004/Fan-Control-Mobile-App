import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator()

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
    <Stack.Screen name='Welcome' component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignUpScreen}></Stack.Screen>
    </Stack.Navigator>
)

export default AuthNavigator;