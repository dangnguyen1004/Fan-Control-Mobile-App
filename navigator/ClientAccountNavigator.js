import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import ClientAccountScreen from '../screens/ClientAccountScreen';
import AdaAccountScreen from '../screens/AdaAccountScreen';
import ControlRoomScreen from '../screens/ControlRoomScreen';
import PasswordScreen from '../screens/PasswordScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PhoneScreen from '../screens/PhoneScreen';
import ClientActivityScreen from '../screens/ClientActivityScreen';
import UploadAvatarScreen from '../screens/UploadAvatarScreen';

const Stack = createStackNavigator()

const ClientAccountNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='ClientAccount' component={ClientAccountScreen}></Stack.Screen>
        <Stack.Screen name='Password' component={PasswordScreen}></Stack.Screen>
        <Stack.Screen name='Notification' component={NotificationScreen}></Stack.Screen>
        <Stack.Screen name='Phone' component={PhoneScreen}></Stack.Screen>
        <Stack.Screen name='ClientActivity' component={ClientActivityScreen}></Stack.Screen>
        <Stack.Screen name='UploadAvatar' component={UploadAvatarScreen}></Stack.Screen>
    </Stack.Navigator>
)

export default ClientAccountNavigator;