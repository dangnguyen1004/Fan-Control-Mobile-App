import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Account from '../screens/Account';
import AccountProfile from '../screens/AccountProfile';
import RegisterRoom from '../screens/RegisterRoom';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword'
const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="AccountProfile" component={Account}/>
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUp" component={SignUp} />
    <Screen name="Account" component={Account} />
    <Screen name="RegisterRoom" component={RegisterRoom}/>
    <Screen name="ForgotPassword" component={ForgotPassword}/>
  </Navigator>
);

export const MainNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);