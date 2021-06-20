import React from 'react';
import {Text,StyleSheet,TouchableOpacity,View,Image} from 'react-native';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';

function InfoBoxGrid(props) {
    return (
        <TouchableOpacity style={styles.touchable} onPress={props.onPress}>
            <View style={styles.contentHolder}>
        
                <View style={styles.holderHeader}>
                    <Text style={styles.textHeader}>{props.header}</Text>
                <Image
                        style={styles.iconImage}
                        source={props.source}
                    />
                </View>
                <View style={styles.holderValue}>
                    <Text style={styles.textContent} numberOfLines={2}>{props.value}</Text>
                    {props.value2 === undefined ? null : <Text style={styles.textContent} numberOfLines={2}>{props.value2}</Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
     touchable: {
      width: '80%',
      height: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12
  },
   contentHolder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 10
  },
   holderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  textHeader: {
      color: '#1e88e5',
      fontSize: size.normal,
      fontFamily: font.textSemiBold,
      margin: 5
  },
    iconImage: {
      height: 25,
      width: 25,
      margin: 5,

  },
  holderValue: {
  },
   textContent: {
      fontSize: size.titleDescription,
      fontFamily: font.textBold,
      paddingLeft: 5,
      color: color.primary
  },
})

export {InfoBoxGrid}
