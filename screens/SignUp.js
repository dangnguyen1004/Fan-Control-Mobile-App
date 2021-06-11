
import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions, Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView,ScrollView,LogBox} from 'react-native';
import {Headline} from '../components/header';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '@firebase/app';
import "@firebase/auth";
import '@firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const windowHeight = Dimensions.get('window').height-StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
export default function SignUp({navigation}) {
  const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  };
    const [notFocusU,setFocusU] = React.useState(true)
    const [notFocusP,setFocusP] = React.useState(true)
    const [notFocusCP,setFocusCP] = React.useState(true)
    const [invisibleP,setvisibleP] = React.useState(true)
    const [invisibleCP,setvisibleCP] = React.useState(true)
    const [userText,setUserText] = React.useState('')
    const [passText,setPassText] = React.useState('')
    const [cpassText,setCPassText] = React.useState('')
    const [errorUser,setErrorUser] = React.useState('')
    const [errorPass,setErrorPass] = React. useState('')
    const [errorcPass,setErrorCPass] = React.useState('')
    const password = React.useRef();
    const confirmPassword = React.useRef();
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
        if (passText.trim() == '')
        {
          setErrorPass('Password can\'t be empty')
          err = true
        }
        else if ( passText.trim().length < 8)
        {
          setErrorPass('Password must be at least 8 characters')
          err = true
        }
        else
        {
          setErrorPass('')
        }
        if (cpassText.trim() == '')
        {
          setErrorCPass('Password can\'t be empty')
          err = true
    
        }
        else if (cpassText.trim().length < 8)
        {
          setErrorCPass('Password must be at least 8 characters')
          err = true
        }
        else if (cpassText.trim() != passText.trim())
        {
          setErrorCPass('Password does not match')
          setErrorPass('Password does not match')
          err = true
        }
        else
        {
          setErrorCPass('')
        }
        if ( err == true)
        {
          return
        }
        else
        {
          firebase
            .auth()
            .createUserWithEmailAndPassword(userText, passText)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email : userText,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                      navigation.navigate('AccountProfile', {userID : uid})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
          });
        }
      

    }
  return (
    <View style = {styles.container}> 
      <KeyboardAwareScrollView>
          <View style={styles.container}>
              <StatusBar   
              backgroundColor = "#102542"
              barStyle = "dark-content"   
              />  
              
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
                    title="Sign Up"
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
            <Text style={styles.textH1}>Lighting control</Text>
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
              returnKeyType="next"
              onSubmitEditing={() => {
              password.current.focus();
              }}
              blurOnSubmit={false}
              leftIconContainerStyle = {styles.iconLeft}
              inputContainerStyle ={styles.input}
              placeholder='Username'
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
          <View style={styles.smallContainer}>
            <View style={styles.inputContainer}>
            <Input
              errorMessage={errorPass}
              errorStyle={styles.errorStyle}
              defaultValue={passText}
              onChangeText={(text) => setPassText(text)}
              onFocus={() => setFocusP(false)}
              onBlur={() => setFocusP(true)}
              ref={password}
              returnKeyType="next"
              onSubmitEditing={() => {
              confirmPassword.current.focus();
              }}
              blurOnSubmit={false}
              leftIconContainerStyle = {styles.iconLeft}
              rightIconContainerStyle = {styles.iconRight}
              inputContainerStyle ={styles.input}
              placeholder='Password'
              leftIcon={
                <Icon
                  name='key'
                  size={18}
                  color = {notFocusP ? '#908C8C' : '#2F81ED'}
                />
              }
              rightIcon={
                <Icon
                  name= {invisibleP ? 'eye-slash' : 'eye'}
                  size={22}
                  color={'#908C8C'}
                  onPress={() => setvisibleP(!invisibleP)}
                  hitSlop={{ left: 8, right: 8 }}
                />
              }
              secureTextEntry= {invisibleP}
            />
            </View>
          </View>
          <View style={styles.smallContainer}>
            <View style ={styles.inputContainer}>
            <Input
              errorMessage={errorcPass}
              errorStyle={styles.errorStyle}
              defaultValue={cpassText}
              onChangeText={(text) => setCPassText(text)}
              onFocus={() => setFocusCP(false)}
              onBlur={() => setFocusCP(true)}
              onSubmitEditing={() => validateInput()}
              ref={confirmPassword}
              leftIconContainerStyle = {styles.iconLeft}
              rightIconContainerStyle = {styles.iconRight}
              inputContainerStyle ={styles.input}
              placeholder='Confirm Password'
              leftIcon={
                <Icon
                  name='key'
                  size={18}
                  color = {notFocusCP ? '#908C8C' : '#2F81ED'}
                />
              }
              rightIcon={
                <Icon
                  name= {invisibleCP ? 'eye-slash' : 'eye'}
                  size={20}
                  color={'#908C8C'}
                  onPress={() => setvisibleCP(!invisibleCP)}
                  hitSlop={{ left: 8, right: 8 }}
                />
              }
              secureTextEntry= {invisibleCP}
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
    fontWeight: '400',
    fontFamily: 'Roboto',
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
    fontWeight: 'bold',
    fontSize:15,
    textDecorationLine: 'underline'
  },
  errorStyle: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#DB0000'
  }
});
