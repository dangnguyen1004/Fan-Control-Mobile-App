import React from 'react';
import {Text,StyleSheet,TextInput} from 'react-native';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';

function ValueInput (props) {
    return (
        <TextInput
            defaultValue = {props.defaultValue}
            onChangeText = {props.onChangeText}
            keyboardType= {props.keyboardType}
            style={styles.input}
            placeholder= {props.placeholder}
            ref = {props.ref}
            defaultValue = {props.defaultValue}
            returnKeyType = {props.returnKeyType}
            blurOnSubmit = {props.blurOnSubmit}
            onSubmitEditing={props.onSubmitEditing}
            />
    )
}

const styles= StyleSheet.create({
     input: {
    height: 40,
    margin: size.margin,
    paddingLeft: size.padding,
    fontSize: size.normal,
    borderRadius: size.buttonRadius,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2,
    backgroundColor:'white' // Android
  }
})

export {ValueInput};