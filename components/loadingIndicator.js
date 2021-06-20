import React from 'react';
import {Text,StyleSheet,TextInput,ActivityIndicator,View} from 'react-native';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';

function LoadingIndicator(props) {
    return (
        <View style={styles.loading}>
             <ActivityIndicator size={size.loadingSize}  color ={color.primary} visible={props.visible}/>
         </View>
    )
}

const styles= StyleSheet.create({
    loading: {
        alignItems:'center', 
        justifyContent: 'center', 
        flex: 1
    }
})

export {LoadingIndicator};