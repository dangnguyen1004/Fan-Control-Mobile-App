
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View, StatusBar ,useWindowDimensions, Keyboard,TouchableWithoutFeedback,Dimensions  } from 'react-native';
import {Headline} from '../components/header';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Value } from 'react-native-reanimated';
import firebase from 'firebase/app';
import "firebase/auth";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
export default function SignIn( { navigation }) {
  const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }
    const [notFocusU,setFocusU] = React.useState(true)
    const [notFocusP,setFocusP] = React.useState(true)
    const [invisibleP,setvisibleP] = React.useState(true)
    const [userText,setUserText] = React.useState('')
    const [passText,setPassText] = React.useState('')
    const [errorUser,setErrorUser] = React.useState('')
    const [errorPass,setErrorPass] = React. useState('')
    const password = React.useRef();
    const validateInput = () => {
        var err = false
        if (userText.trim() == '')
        {
          setErrorUser('Invalid username')
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
          err = false
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
          err = false
        }
        
        if (err == false)
        {
           firebase
            .auth()
            .signInWithEmailAndPassword(userText, passText)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Account', {userID: uid})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
        }
        
    }
    const setText = (key, val) => {
      switch (key) {
        case 'username':
          setUserText(val);
          break;
        case 'password':
          setPassText(val);
          break;
      }
    }

    const handleForgotPasswordPress = () => {
      navigation.navigate('ForgotPassword')
    }

    const handleSignUpPress = () => {
      navigation.navigate('SignUp')
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
      <View style={styles.body}>
        <View style={styles.j4f}>
         <Button containerStyle = {styles.signUp}
          
          title= "Sign up"
          titleStyle = {styles.graybutton}
          type="clear"
          onPress = {handleSignUpPress}
        />
        <Button containerStyle = {styles.forgotPassword}
          title= "Forgot Password?"
          titleStyle = {styles.graybutton}
          type="clear"
          onPress= {handleForgotPasswordPress}
        />
      </View>
        <Button containerStyle = {styles.signIn}
          title="Sign in"
          titleStyle= {{fontFamily: textBold}}
          ViewComponent={LinearGradient}
          linearGradientProps = {GradientAttribute}
          onPress= {validateInput}
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
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorStyle}
          defaultValue={userText}
          onChangeText={(text) => setText('username',text)}
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
         <View style={styles.smallContainer}>
        <View style={styles.inputContainer}>
        <Input
          errorMessage={errorPass}
          errorStyle={styles.errorStyle}
          defaultValue={passText}
          onChangeText={(text) => setText('password',text)}
          onFocus={() => setFocusP(false)}
          onBlur={() => setFocusP(true)}
          onSubmitEditing={() => validateInput()}
          ref={password}
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
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height : windowHeight * 0.8,
    backgroundColor: '#fff',
    flexDirection: 'column-reverse'
  },
  footer: {
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signBox: {
    alignItems:'center',
    top : 0.05 * windowHeight,
    left: 0.08 * windowWidth ,
    right: 0.08 * windowWidth,
    height: 0.6 * windowHeight,
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
    paddingLeft : '5%'
  }, 
  input: {
    width : '75%'
  },
  signIn: {
    margin: 0.05 * windowHeight,
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
    fontSize:15,
    textDecorationLine: 'underline',
    fontFamily: textBold,
  },
  errorStyle: {
    fontFamily: textSemiBold,
    color: '#DB0000'
  },
  inputStyle: {
  }
});
