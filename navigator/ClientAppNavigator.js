import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'
import { Platform } from 'react-native';

import color from '../config/color';
import ClientAccountNavigator from './ClientAccountNavigator'
import ClientControlNavigator from './ClientControlNavigator';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import firebase from '../firebase/connectFirebase'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Tab = createBottomTabNavigator()
const ClientAppNavigator = () => {
    const [expoPushToken, setExpoPushToken] = useState()
    const [notification, setNotification] = useState()
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])


    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            let user = firebase.auth().currentUser
            firebase.database().ref('users/' + user.uid).child('tokenPushNotifications').set(token)
            console.log(token);
        } else {    
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }


        return token;
    }


    return (
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
}

export default ClientAppNavigator;