import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ChooseRoomScreen from '../screens/ChooseRoomScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import ControlRoomScreen from '../screens/ControlRoomScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';

const Stack = createStackNavigator()

const ControlNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='ChooseRoom' component={ChooseRoomScreen}></Stack.Screen>
        <Stack.Screen name='AddRoom' component={AddRoomScreen}></Stack.Screen>
        <Stack.Screen name='ControlRoom' component={ControlRoomScreen}></Stack.Screen>
        <Stack.Screen name='AddDevice' component={AddDeviceScreen}></Stack.Screen>
    </Stack.Navigator>
)

export default ControlNavigator;