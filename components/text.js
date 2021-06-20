import React from 'react';
import {Text,StyleSheet} from 'react-native';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';
function HeaderText(props) {
    return (
        <Text style= {styles.headerText}>{props.value}</Text>
    )
}
function SubHeaderText(props) {
    return (
        <Text style= {styles.subHeaderText}>{props.value}</Text>
    )
}

function HeaderDescription(props) {
    return (
        <Text style={styles.headerDescription}>{props.value}</Text>
    )
}


function ListItemText(props) {
    return (
        <Text style={styles.itemText}>{props.value}</Text>
    )
}

function ListEmptyText(props) {
    return (
         <Text style={styles.listEmptyText}>{props.value}</Text>
    )
}

function TransparentButtonText(props) {
    return (
        <Text style={styles.transparentButtonText}>{props.value}</Text>
    )
}

function NormalButtonText(props) {
    return (
        <Text style={{...styles.transparentButtonText,color: color.white}}>{props.value}</Text>
    )
}

function OnButtonText(props) {
    return (
        <Text style={{...styles.transparentButtonText,fontSize: size.title, color: color.white}}>{props.value}</Text>
    )
}

const styles = StyleSheet.create({
    headerText: {
    left: size.padding,
    fontSize: size.title,
    fontFamily: font.textBold,
    color: color.primary
  },
   subHeaderText: {
    left: size.padding,
    color: color.secondary,
    fontSize: size.subTitle,
    fontFamily: font.textSemiBold,
    paddingTop: size.padding
   },
   headerDescription: {
    left: size.padding,
    fontSize: size.titleDescription,
    color: color.third,
    fontFamily: font.textSemiBold
   },
   itemText: {
    fontSize: size.normal,
    fontFamily: font.textMedium
   },
   listEmptyText: {
    fontFamily: font.textBold, 
    color: color.gray,
    fontSize: size.titleDescription,
    alignSelf: 'center'
   },
   transparentButtonText : {
    fontSize: size.buttonText,
    color: color.primary,
    fontFamily: font.textSemiBold
    }
})

export {HeaderText,SubHeaderText,HeaderDescription,ListItemText,ListEmptyText,TransparentButtonText,NormalButtonText,OnButtonText};