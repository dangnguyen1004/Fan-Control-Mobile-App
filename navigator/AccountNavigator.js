import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/AccountScreen';
import AdaAccountScreen from '../screens/AdaAccountScreen';
import PasswordScreen from '../screens/PasswordScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PhoneScreen from '../screens/PhoneScreen';
import UploadAvatarScreen from '../screens/UploadAvatarScreen';

const Stack = createStackNavigator()

const AccountNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='Account' component={AccountScreen}></Stack.Screen>
        <Stack.Screen name='AdaAccount' component={AdaAccountScreen}></Stack.Screen>
        <Stack.Screen name='Password' component={PasswordScreen}></Stack.Screen>
        <Stack.Screen name='Notification' component={NotificationScreen}></Stack.Screen>
        <Stack.Screen name='Phone' component={PhoneScreen}></Stack.Screen>
        <Stack.Screen name='UploadAvatar' component={UploadAvatarScreen}></Stack.Screen>
    </Stack.Navigator>
)

export default AccountNavigator;