import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import AccountNavigator from './AccountNavigator'
import color from '../config/color';
import ControlNavigator from './ControlNavigator';
import ActivityLogScreen from '../screens/ActivityLogScreen';

const Tab = createBottomTabNavigator()
const AppNavigator = () => (
    <Tab.Navigator tabBarOptions={{
        activeBackgroundColor: color.light,
        showLabel: false,
    }
    }>
        <Tab.Screen name='ControlNavigator' component={ControlNavigator} options={{
            tabBarLabel: 'Control', tabBarIcon: () => (
                <MaterialCommunityIcons name='remote' size={25} color={color.primary}></MaterialCommunityIcons>
            )
        }}></Tab.Screen>
        <Tab.Screen name='ActivityLog' component={ActivityLogScreen} options={{
            tabBarLabel: 'Log', tabBarIcon: () => (
                <FontAwesome name='history' size={25} color={color.primary}></FontAwesome>
            )
        }}></Tab.Screen>
        <Tab.Screen name='AccountNavigator' component={AccountNavigator} options={{
            tabBarLabel: 'Account', tabBarIcon: () => (
                <MaterialCommunityIcons name='account' size={25} color={color.primary}></MaterialCommunityIcons>
            )
        }}></Tab.Screen>
    </Tab.Navigator>
)

export default AppNavigator;