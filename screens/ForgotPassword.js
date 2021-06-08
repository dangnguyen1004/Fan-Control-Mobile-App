import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback,Keyboard  } from 'react-native';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/logout.svg';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function RegisterRoom() {
  const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }
  return (
    <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar   
        backgroundColor = "#102542"
        barStyle = "dark-content"   
      />
      <View style={styles.header}>
         <Headline/>
      </View>
      <View  style={styles.body}>
        <View style={styles.usable}>
          
        <View style={styles.heading}>
          <Text style={styles.account}>Register room</Text>
        </View>
        <Text style={styles.completeP} >Choose room</Text>
        <Text style={styles.title}>Building</Text>
        <View style={styles.holder}>
          <InfoBox value = 'H1' />
        </View>
        <Text style={styles.title}>Room</Text>
        <View style={styles.holder}>
          <InfoBox value = '601' />
        </View>
        <Button containerStyle = {styles.register}
          buttonStyle = {styles.button}
          title="Register room"
      />
      </View>
      </View>
       <View style={styles.navigation}>
        <Button
          title="ACCOUNT"
          titleStyle={{ fontSize: 20}}
          containerStyle={styles.navigationButton}
          type="clear"
        />
        <Button
          title="CONTROL"
          titleStyle={{color: '#908C8C', fontSize: 20}}
          containerStyle={styles.navigationButton}
          type="clear"
        />
      </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    width: windowWidth,
    height: 0.1 * windowHeight,
    backgroundColor: '#000',
  },
  body: {
    top: 0.05 * windowHeight,
    width: windowWidth,
    height: 0.95 * windowHeight,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 47,
    borderTopRightRadius: 47
  },
  usable: {
    top: 0.03 * windowHeight,
    height: 0.92*windowHeight,
    width: windowWidth,
  },
  heading: {
    flexDirection: 'row'
  },
  account: {
    left: 0.04 * windowWidth,
    fontSize: 30,
    color: '#2F81ED'
  },
  exit: {
    alignSelf: 'center',
    paddingLeft: 0.5 * windowWidth
  },
  completeP: {
    left: 0.04 * windowWidth,
    paddingBottom: 20,
    width: windowWidth,
    color: '#C4C4C4',
    fontSize: 18
  },
  title: {
    left: 0.04 * windowWidth,
    color: '#908C8C',
    fontSize: 20,
    paddingTop: 0.0015 * windowHeight

  },
  holder: {
    alignSelf: 'center',
    paddingTop: 0.02 * windowHeight,
    width: 0.9 * windowWidth
  },
  register: 
  {
    width: 0.9 * windowWidth,
    alignSelf: 'center',
    paddingTop: 0.05 * windowHeight
  },
  button : 
  {
    borderRadius: 26,
    backgroundColor: '#908C8C'
  },
  navigation: 
  {
    flexDirection: 'row',
    width: windowWidth,
    top: 0.9 * windowHeight,
    bottom: 0.005 * windowHeight,
    position: 'absolute'
  },
  navigationButton:
  {
    width: '50%'
  }
});