
import React from 'react';
import { Platform, StyleSheet, View,Dimensions,StatusBar, Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView,ScrollView,LogBox,ActivityIndicator} from 'react-native';
import StatusBarCustom from '../components/statusBar';
import {Headline} from '../components/header';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '@firebase/app';
import "@firebase/auth";
import '@firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const windowHeight = Dimensions.get('window').height-StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
};
export default function SignUp({navigation}) {
    const [notFocusU,setFocusU] = React.useState(true)
    const [userText,setUserText] = React.useState('')
    const [errorUser,setErrorUser] = React.useState('')
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
    const validateInput = () => {
        var err = false
        if (userText.trim() == '')
        {
          setErrorUser('Invalid username');
          err = true
        }
        else if (userText.trim().length < 8)
        {
          setErrorUser('Username must be at least 8 characters')
          err = true
        }
        else
        {
          setErrorUser('')
        }
        if (err)
        {
          return
        }
        else
        {
          firebase.auth().sendPasswordResetEmail(userText)
          .then(() => {
            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
        }
    }
  return (
    <View style = {styles.container}> 
      <KeyboardAwareScrollView>
          <View style={styles.container}>
              <StatusBarCustom/>  
                  <View style={styles.header}>
                    <Headline/>
                  </View>
              <View style={styles.body}> 
                <View style={styles.j4f}>
                  <Button containerStyle = {styles.signUp}
                    title= "Sign in"
                    titleStyle = {styles.graybutton}
                    type="clear"
                    onPress={() => handleSignInPress()}
                  />
                  <Button containerStyle = {styles.forgotPassword}
                    title= "Forgot Password?"
                    titleStyle = {styles.graybutton}
                    type="clear"
                    onPress={() => navigation.navigate('ForgotPassword')}
                  />
                </View>
                  <Button containerStyle = {styles.signIn}
                    title="Send"
                    titleStyle= {{fontFamily: textBold}}
                    ViewComponent={LinearGradient}
                    linearGradientProps = {GradientAttribute}
                    onPress = {validateInput}
                  />
                </View> 
            <View style={styles.footer}>
              <Headline/>
            </View>
        <View elevation={16} style={styles.signBox}>
          <View style={styles.smallHeader}>
            <Text style={styles.textH1}>Find account</Text>
          </View>
          <View>
            <Text style={styles.content}>Enter your email </Text>
          </View>
          <View style={styles.smallContainer}>
            <View style ={styles.inputContainer}>
            <Input 
              errorMessage={errorUser}
              errorStyle={styles.errorStyle}
              defaultValue={userText}
              onChangeText={(text) => setUserText(text)}
              onFocus={() => setFocusU(false)}
              onBlur={() => setFocusU(true)}
              leftIconContainerStyle = {styles.iconLeft}
              inputContainerStyle ={styles.input}
              placeholder='Email'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color = {notFocusU ? '#908C8C' : '#2F81ED'}
                />
              }
              rightIcon={
                <Icon
                  name= 'times-circle'
                  size={22}
                  color = {notFocusU ? '#fff' : '#908C8C'}
                  onPress={() => setUserText('')}
                />
              }
              />
            </View>
          </View>
            </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    height: 0.1 * windowHeight,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height: 0.8 * windowHeight,
    backgroundColor: '#fff',
    flexDirection: 'column-reverse'
  },
  footer: {
    height: 0.1 * windowHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signBox: {
    alignItems:'center',
    top : 0.05 * windowHeight,
    left: 0.08 * windowWidth ,
    right: 0.08 * windowWidth,
    height: 0.64 * windowHeight,
    position: 'absolute',
    backgroundColor: "#fff",
    borderRadius : 38,
    shadowColor: "#000",
  shadowOffset: {
	  width: 5,
  	height: 8,
    },
shadowOpacity: 0,
shadowRadius: 10.32,
  },
  textH1 : {
    fontFamily: textBold,
    fontSize: 35 ,
    color: '#2F81ED',
  },
  smallHeader: {
    alignItems:'center',
    paddingTop: '3%',
    flex: 1
  },
  smallContainer: {
    alignItems:'center',
    flex: 1.5
  },
  inputContainer: {
    flex: 1,
    alignItems:'center',
  },
  iconLeft: {
    paddingRight :'5%'
  },
  iconRight: {
    paddingLeft : '5%',
  },
  input: {
    width : '75%'
  },
  signIn: {
    margin: 0.05 *windowHeight,
    width : 0.5 * windowWidth,
    alignSelf : 'center',
    borderRadius: 26
  },
  j4f: {
    width: windowWidth,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  signUp: {
    width : 0.5 * windowWidth, 
    alignSelf: 'flex-start',
  },
  forgotPassword: {
    width : 0.5 * windowWidth, 
    alignSelf: 'flex-end',
  },
  graybutton: {
    color: '#615353',
    fontFamily: textBold,
    fontSize:15,
    textDecorationLine: 'underline'
  },
  errorStyle: {
    fontFamily: textSemiBold,
    color: '#DB0000'
  },
  content: {
    fontFamily: textBold,
    fontSize: 18,
    margin: 20
  }
});
