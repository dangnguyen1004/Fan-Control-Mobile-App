import React from "react";
import { Text } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import Account from '../screens/Account';
import AccountProfile from '../screens/AccountProfile';
import RegisterRoom from '../screens/RegisterRoom';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import AddDevice from '../screens/AddDevice';
import ChooseRoom from '../screens/ChooseRoom';
import RoomControl from '../screens/RoomControl';
import DeviceControl from '../screens/DeviceControl';
import DeviceName from '../screens/DeviceName';
import DeviceLimit from '../screens/Limit';
import RoomLog from '../screens/RoomLog';
import { Tab } from "react-native-elements/dist/tab/Tab";
const Authentication = createStackNavigator();
const Control = createStackNavigator();
const Tabs = createBottomTabNavigator();
const horizontalAnimation = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const horizontalReverseAnimation = {
  gestureEnabled: true,
  gestureDirection: 'horizontal-inverted',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0,1],
              outputRange: [-layouts.screen.width,0],
              
            }),
          },
        ],
      },
    };
  },
};
const verticalAnimation = {
  gestureEnabled: true,
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height,0],
            }),
          },
        ],
      },
    };
  },
};

const AuthenticationNavigator = () => (
  <Authentication.Navigator headerMode="none">
    <Authentication.Screen name="SignIn" component={SignIn} />
    <Authentication.Screen name="SignUp" component={SignUp} />
    <Authentication.Screen name="ForgotPassword" component={ForgotPassword}/>
    {/* <Authentication.Screen name="AccountProfile" component={AccountProfile}/> */}
  </Authentication.Navigator>
)
const RoomNavigator = () => (
  <Control.Navigator headerMode="none">
    <Control.Screen name="Home" component={TabsNavigator}/>
    <Control.Screen name="RegisterRoom" component={RegisterRoom}  options={horizontalReverseAnimation}/>
    <Control.Screen name="RoomLog" component={RoomLog} options={verticalAnimation}/>
    <Control.Screen name="RoomControl" component={RoomControl} options={horizontalAnimation}/>
    <Control.Screen name="DeviceControl" component={DeviceControl} options={horizontalAnimation}/>
    <Control.Screen name="DeviceLimit" component={DeviceLimit} options={horizontalAnimation}/>
    <Control.Screen name="DeviceName" component={DeviceName} options={horizontalAnimation} />
    <Control.Screen name="AddDevice" component={AddDevice} options={verticalAnimation}/>
    <Control.Screen name="AccountProfile" component={AccountProfile}/>
  </Control.Navigator>
);

const activeTintLabelColor = '#2F81ED';
const inactiveTintLabelColor ='#808080';
const TabsNavigator = () => (
  <Tabs.Navigator initialRouteName="Feed"
      tabBarOptions={{
      }}>
    <Tabs.Screen name="Account" component={Account} options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: focused ? activeTintLabelColor : inactiveTintLabelColor, fontFamily: 'Mulish-Medium'}}>
              Account
            </Text>
            ),
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='user-circle'
              type='font-awesome-5'
              color={color}
              size={size}
            />
          ),
        }} />
    <Tabs.Screen name="Control" component={ChooseRoom} options={{
           tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: focused ? activeTintLabelColor : inactiveTintLabelColor, fontFamily: 'Mulish-Medium'}}>
              Control
            </Text>
            ),
          tabBarIcon: ({ color, size }) => (
             <Icon
              name='sliders-h'
              type='font-awesome-5'
              color={color}
              size={size}
            />
          ),
        }}/>
  </Tabs.Navigator>
);
const AppNavigator = () => (
    <RoomNavigator/>
);

export {AuthenticationNavigator,AppNavigator}