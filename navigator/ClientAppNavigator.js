import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import color from '../config/color';
import ClientAccountNavigator from './ClientAccountNavigator'
import ClientControlNavigator from './ClientControlNavigator';

const Tab = createBottomTabNavigator()
const ClientAppNavigator = () => (
    <Tab.Navigator tabBarOptions={{
        activeBackgroundColor: color.light,
        showLabel: false,
    }
    }>
        <Tab.Screen name='ClientControlNavigator' component={ClientControlNavigator} options={{
            tabBarLabel: 'Control', tabBarIcon: () => (
                <MaterialCommunityIcons name='remote' size={25} color={color.primary}></MaterialCommunityIcons>
            )
        }}></Tab.Screen>
        <Tab.Screen name='ClientAccountNavigator' component={ClientAccountNavigator} options={{
            tabBarLabel: 'Account', tabBarIcon: () => (
                <MaterialCommunityIcons name='account' size={25} color={color.primary}></MaterialCommunityIcons>
            )
        }}></Tab.Screen>
    </Tab.Navigator>
)

export default ClientAppNavigator;