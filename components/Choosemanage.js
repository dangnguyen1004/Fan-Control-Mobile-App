import { StatusBar } from 'expo-status-bar';
import React, { Component, version } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button, TextInput, ScrollView } from 'react-native';
import blue from '../assets/blue.png'

import { AntDesign } from '@expo/vector-icons';

export default function Choosemanage ({navigation})  {
        return (
            <View style ={css.container}> 
                <View style={css.header}>
                    <Image source ={blue} style={{flex:1, width:'100%', height:20,} }></Image>
                    <View style={{flex:4}}>
                        <Text style={{fontSize: 30, color:'#2196F3', marginLeft: 20}}>Management </Text>
                        <Text style={{fontSize:12, marginLeft:20, color:'gray'}}>Manage your devices in room </Text>
                    </View>
                </View>
                <View style={css.body}> 
                    <View style={css.air}>
                        <TouchableOpacity onPress={()=> navigation.navigate('CONTROL DEVICE')}>
                            <Text style={{
                                fontSize:40,                     
                                position:'absolute',
                                top:30,
                                right: 0,
                                zIndex:10,
                                elevation: 9,
                                marginLeft: 50, color:'white'
                            }}>Fan and Air - Condition</Text>
                            <Image source ={blue} style={{ width:'100%', height:200, borderRadius:30} }></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={css.sensor}>

                        <TouchableOpacity onPress={()=> navigation.navigate('SENSOR CONTROL')}>
                            <Text style={{
                                fontSize:40,                     
                                position:'absolute',
                                top:30,
                                right: 0,
                                zIndex:10,
                                elevation: 9,
                                marginLeft: 50, color:'white'
                            }}>Sensor
                            Management</Text>
                            <Image source ={blue} style={{ width:'100%', height:200, borderRadius:30} }></Image>
                        </TouchableOpacity>

                    </View>
                </View>
            
            </View>
        );
}
const css = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
      flex:1
    },
    
    body:{
        flex:3,
        justifyContent:'center',
        alignContent:'center'
    },
    air:{
        flex:1,
        marginLeft:20,
        marginRight:20
    },
    sensor:{
        flex:1,
        marginLeft:20,
        marginRight:20,
    }
})