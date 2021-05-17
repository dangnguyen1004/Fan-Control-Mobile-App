
import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions } from 'react-native';
import {Headline} from './components/header';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function App() {
  const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }
  return (
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
        />
        <Button containerStyle = {styles.forgotPassword}
          title= "Forgot Password?"
          titleStyle = {styles.graybutton}
          type="clear"
        />
      </View>
        <Button containerStyle = {styles.signIn}
          title="Sign in"
          ViewComponent={LinearGradient}
          linearGradientProps = {GradientAttribute}
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
          leftIconContainerStyle = {styles.icon}
          inputContainerStyle ={styles.input}
          placeholder='Account'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='#908C8C'
            />
          }
        />
        </View>
         <View style={styles.smallContainer}>
        <View style={styles.inputContainer}>
        <Input
          leftIconContainerStyle = {styles.icon}
          inputContainerStyle ={styles.input}
          placeholder='Password'
          leftIcon={
            <Icon
              name='key'
              size={18}
              color='#908C8C'
            />
          }
          secureTextEntry={true}
        />
        </View>
        </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    width: windowWidth,
    height: 0.1 * windowHeight,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: windowWidth,
    height: 0.8 * windowHeight,
    backgroundColor: '#fff',
    flexDirection: 'column-reverse'
  },
  footer: {
    width: windowWidth,
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
    height: 0.5 * windowHeight,
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
    fontWeight: 'bold',
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
  icon: {
    paddingRight :'5%'
  },
  input: {
    width : '75%'
  },
  signIn: {
    top: 0.1 *windowHeight,
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
  }
});
