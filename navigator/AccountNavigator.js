import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/AccountScreen';
import AdaAccountScreen from '../screens/AdaAccountScreen';

const Stack = createStackNavigator()

const AccountNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='Account' component={AccountScreen}></Stack.Screen>
        <Stack.Screen name='AdaAccount' component={AdaAccountScreen}></Stack.Screen>
    </Stack.Navigator>
)

export default AccountNavigator;