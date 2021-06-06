import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AccountNavigator from './AccountNavigator'
import color from '../config/color';
import ControlNavigator from './ControlNavigator';

const Tab = createBottomTabNavigator()
const AppNavigator = () => (
    <Tab.Navigator tabBarOptions={{
        activeBackgroundColor: color.light,
        labelStyle: {
            fontSize: 15,
        }
    }}>
        <Tab.Screen name='ControlNavigator' component={ControlNavigator} options={{tabBarLabel: 'Control', tabBarIcon: () => (
            <MaterialCommunityIcons name='remote' size={25} color={color.primary}></MaterialCommunityIcons>
        )}}></Tab.Screen>
        <Tab.Screen name='AccountNavigator' component={AccountNavigator} options={{tabBarLabel: 'Account', tabBarIcon: () => (
            <MaterialCommunityIcons name='account' size={25} color={color.primary}></MaterialCommunityIcons>
        )}}></Tab.Screen>
    </Tab.Navigator>
)

export default AppNavigator;