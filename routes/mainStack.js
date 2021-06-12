import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
const { Navigator, Screen } = createStackNavigator();
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

const verticalAnimation = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};
const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="SignIn" component={SignIn} />
    <Screen name="ChooseRoom" component={ChooseRoom}/>
     <Screen name="DeviceControl" component={DeviceControl} options={horizontalAnimation}/>
    <Screen name="RegisterRoom" component={RegisterRoom} />
    <Screen name="RoomControl" component={RoomControl}/>
    <Screen name="SignUp" component={SignUp} />
    <Screen name="Account" component={Account} />
    <Screen name="AccountProfile" component={AccountProfile}/>
    <Screen name="ForgotPassword" component={ForgotPassword}/>
    <Screen name="AddDevice" component={AddDevice}/>
  </Navigator>
);

export const MainNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);