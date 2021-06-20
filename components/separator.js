import React from 'react';
import {Text,StyleSheet,View} from 'react-native';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';
const FlatListItemSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  }

const TextSeparator = () => {
   return (
        <View style={styles.separatorText}/>
    )
}

const styles= StyleSheet.create({
    separator : {
        height: 1,
        width: "100%",
        backgroundColor: color.fourth,
        alignSelf: 'center'
    },
    separatorText: {
        backgroundColor: '#06492C',
        opacity: 0.1,
        height: 1,
        marginVertical: 10
    },
})

export {FlatListItemSeparator,TextSeparator}