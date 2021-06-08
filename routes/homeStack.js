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
const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="ChooseRoom" component={ChooseRoom}/>
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUp" component={SignUp} />
    <Screen name="Account" component={Account} />
    <Screen name="AccountProfile" component={AccountProfile}/>
    <Screen name="RegisterRoom" component={RegisterRoom}/>
    <Screen name="ForgotPassword" component={ForgotPassword}/>
    <Screen name="AddDevice" component={AddDevice}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);