import React from 'react';
import { Platform, StyleSheet, View ,Dimensions,TouchableWithoutFeedback,Keyboard  } from 'react-native';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import StatusBar from '../components/statusBar';
import {Text,Input,Button} from 'react-native-elements';
import { HeaderText,SubHeaderText,HeaderDescription } from '../components/Text';
import { GrayButton } from '../components/button';
import Logout from '../assets/images/logout.svg';
import { CommonActions } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { ValueInput } from '../components/input';
import firebase from 'firebase/app';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function AccountProfile( {navigation, route}) {
  const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }
  const {userID} = route.params;
  const [fullName,setName] = React.useState('');
  const [phone,setPhone] = React.useState('');
  const [privacy,setPrivacy] =React.useState('Student')
  const privacyInput = React.useRef();
  const phoneInput = React.useRef();
  const handleSignInPress = () => {
      navigation.dispatch(
        CommonActions.reset({
        index: 0,
        routes: [
          { name: 'SignIn' },
          ],
        })
      );
    }
  const completeProfile = () => {
    var err = false
    var messageError = ''
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (fullName == '')
    {
       messageError += 'Please enter your full name! \n'
       err = true
    }
    if (phone == '')
    {
      messageError += 'Please enter your phone number! \n'
      err = true
    }
    else if (!phone.match(phoneno))
    {
      messageError += 'Invalid phone number. Please check again! \n'
      err = true
    }
    if (err == false)
    {
      const usersRef = firebase.firestore().collection('users')
      usersRef
          .doc(userID)
          .update({
              fullName: fullName,
              phoneNumber: phone,
              privacy: privacy
          })
          .then(
             navigation.navigate('Home')
          )
          .catch((error) => {
            alert(error)
          })
    }
    else
    {
      alert(messageError)
    }
  }
  return (
    <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
        <StatusBar/>
        <View style={styles.header}>
            <Headline/>
        </View>
        <View  style={styles.body}>
          <View style={styles.usable}>
          <View style={styles.heading}>
            <HeaderText value="Account"/>
          </View>
          <HeaderDescription value="Please complete your profile"/>
          <SubHeaderText value="Name"/>
          <View style={styles.holder}>
              <TextInput
                defaultValue = {fullName}
                onChangeText = {value => setName(value)}
                style={styles.input}
                placeholder = 'Full name'
                returnKeyType = 'next'
                blurOnSubmit = {false}
                onSubmitEditing={() => phoneInput.current.focus()}
        />
          </View>
          <SubHeaderText value="Phone"/>
          <View style={styles.holder}>
            <TextInput
              defaultValue = {phone}
              onChangeText = {value => setPhone(value)}
              keyboardType='numeric'
              style={styles.input}
              placeholder='Phone number'
              ref = {phoneInput}
              />
          </View>
          <SubHeaderText value="Privacy"/>
          <View style={styles.holder}>
            <InfoBox value='Student' dropDown={true}/>
          </View>
          <View style={{margin: 10}}>
          <GrayButton
            title="Complete"
            onPress={completeProfile}
          />
          </View>
        </View>
        </View>
      </View>
     </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
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
  holder: {
    alignSelf: 'center',
    paddingTop: 0.02 * windowHeight,
    width: 0.9 * windowWidth
  },
   input: {
    height: 40,
    margin: 12,
    paddingLeft: 0.05 * windowWidth,
    fontSize: 16,
    borderRadius: 26,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2,
    backgroundColor:'white' // Android
  }
});