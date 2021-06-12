import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,ScrollView  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/images/logout.svg';
import { CommonActions } from '@react-navigation/native';
import { TextInput } from 'react-native';
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
             navigation.navigate('Account', {userID: userID})
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
            <Text style={styles.account}>Account</Text>
            <View style={styles.exit}>
            <Logout width={60} height={30}/>
            </View>
          </View>
          <Text style={styles.completeP} >Please complete your profile</Text>
          <Text style={styles.title}>Name</Text>
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
          <Text style={styles.title}>Phone</Text>
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
          <Text style={styles.title}>Privacy</Text>
          <View style={styles.holder}>
            <InfoBox value='Student' dropDown={true}/>
          </View>
          <Button containerStyle = {styles.register}
            buttonStyle = {styles.button}
            title="Complete"
            titleStyle={{fontFamily: textBold}}
            onPress={completeProfile}
        />
        <Text style ={{alignSelf: 'center',fontSize: 16, fontFamily: textMedium}}>Already have an account?</Text>
        <Button
  title="Back to sign in"
  titleStyle={{fontFamily: textBold}}
  type="clear"
  onPress={handleSignInPress}
/>
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
  account: {
    left: 0.04 * windowWidth,
    fontSize: 30,
    fontFamily: textBold,
    color: '#2F81ED'
  },
  exit: {
    alignSelf: 'center',
    paddingLeft: 0.5 * windowWidth
  },
  completeP: {
    left: 0.04 * windowWidth,
    width: windowWidth,
    color: '#C4C4C4',
    fontSize: 18,
    fontFamily: textSemiBold
  },
  title: {
    left: 0.04 * windowWidth,
    color: '#908C8C',
    fontSize: 20,
    fontFamily: textSemiBold,
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
    height: 0.1 * windowHeight,
    position: 'absolute'
  },
  navigationButton:
  {
    width: '50%'
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
    elevation: 2 // Android
  }
});