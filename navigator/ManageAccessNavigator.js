import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ManageAccessScreen from '../screens/ManageAccessScreen';
import GrantRoomsScreen from '../screens/GrantRoomsScreen';

const Stack = createStackNavigator()

const ManageAccessNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='GrantRooms' component={GrantRoomsScreen}></Stack.Screen>
        <Stack.Screen name='ManageAccess' component={ManageAccessScreen}></Stack.Screen>
    </Stack.Navigator>
)

export default ManageAccessNavigator;