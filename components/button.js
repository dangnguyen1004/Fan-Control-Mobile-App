import React from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {GradientAttribute} from '../config/gradient';
import { LinearGradient } from 'expo-linear-gradient';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';
function GradientButton(props) {
  return (
     <Button     
        containerStyle={styles.gradientButton}
        ViewComponent={LinearGradient}
        linearGradientProps = {GradientAttribute}
        title={props.title}
        titleStyle={styles.titleStyle}
        onPress = {props.onPress}
      />
  )
}

function GrayButton(props) {
    return (
        <Button 
            containerStyle = {styles.register}
            buttonStyle = {styles.button}
            title={props.title}
            titleStyle={styles.titleStyle}
            onPress = {props.onPress}
        />
    )
}

function Touch(props) {
    return (
        <TouchableOpacity
            style={styles.touch}
            onPress={props.onPress}
        >
            {props.children}
        </TouchableOpacity>
    )
}

function TouchButton(props) {
    return (
        <TouchableOpacity
            style={{...styles.touch, justifyContent:'center'}}
            onPress={props.onPress}
        >
            {props.children}
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    register: 
  {
    width: '90%',
    alignSelf: 'center',
    paddingTop: size.padding
  },
     button: 
  {
    borderRadius: size.buttonRadius,
    backgroundColor: color.secondary
  },
    titleStyle: 
  {
      fontFamily: font.textBold
  },
     touch: {
    height: 40,
    margin: size.margin,
    paddingLeft: size.padding,
    borderRadius: size.buttonRadius,
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2,
    backgroundColor: color.white,
    alignItems: 'center' // Android

  },
  gradientButton: {
    margin: size.margin,
    width : '50%',
    alignSelf : 'center',
    borderRadius: size.buttonRadius
  }
})


export {GradientButton,GrayButton,Touch,TouchButton};