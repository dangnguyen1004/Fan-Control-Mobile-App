import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ClientChooseRoomScreen from '../screens/ClientChooseRoomScreen';
import ClientControlRoomScreen from '../screens/ClientControlRoomScreen';
import RequestRoomScreen from '../screens/RequestRoomScreen';
import PendingRoomsScreen from '../screens/PendingRoomsScreen';

const Stack = createStackNavigator()

const ClientControlNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='ClientChooseRoom' component={ClientChooseRoomScreen}></Stack.Screen>
        <Stack.Screen name='ClientControlRoom' component={ClientControlRoomScreen}></Stack.Screen>
        <Stack.Screen name='RequestRoom' component={RequestRoomScreen}></Stack.Screen>
        <Stack.Screen name='PendingRooms' component={PendingRoomsScreen}></Stack.Screen>
    </Stack.Navigator>
)

export default ClientControlNavigator;