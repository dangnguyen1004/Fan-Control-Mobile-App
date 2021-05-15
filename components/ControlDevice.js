import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button } from 'react-native';
import fan from '../assets/fan.jpg'
import dieuhoa from '../assets/dieuhoa.jpg'
import blue from '../assets/blue.png'
import { AntDesign } from '@expo/vector-icons';

export default class ControlDevice extends Component {
  render() {
    return (

        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={blue} style={{width:'100%', height: '100%'}}></Image>
          </View>
          <View style={styles.body}>      
            <View style={styles.content}>
              <Text style={styles.control}>Control <Text style={styles.nameRoom}>Room 101 - H6</Text> </Text>
            </View> 
            <TouchableOpacity style={styles.add}>
              <View>
              
                <View >
                  <Text style={{textAlign:'center', color:'#2196F3', fontWeight:'bold' }}>ADD NEW DEVICE</Text>
                </View>
              
            </View>
            </TouchableOpacity>

            <View style={styles.other}>
              <View style={styles.areafan}>
                <View style={styles.fan}>
                <Text style={{color:'gray', textAlign:'center'}}>F1205 - TOP</Text>
                <Image source={fan} style={styles.imageFan} ></Image>
                <Button title="control">
                </Button> 
              </View>

                <View style={styles.fan}>
              <Text style={{color:'gray', textAlign:'center'}}>F1205 - BOTTOM</Text>
                <Image source={fan} style={styles.imageFan} ></Image>
                <Button title="control"> 
                {/* <Text style={{fontWeight:'bold', fontSize:20, color:'blue', textAlign:'center'}}>control</Text>  */}
                </Button> 
              </View>
            
            </View>
            <View style={styles.areaOther}>
              <View style={styles.fan}>
                  <Text style={{color:'gray', textAlign:'center'}}>F1205 - TOP</Text>
                  <Image source={dieuhoa} style={styles.imageDieuhoa} ></Image>
                  <Button title="control">
                  </Button> 
                </View>

                <View style={styles.fan}>
                <Text style={{color:'gray', textAlign:'center'}}>F1205 - BOTTOM</Text>
                  <Image source={dieuhoa} style={styles.imageDieuhoa} ></Image>
                  <Button title="control">
                  </Button> 
                </View>
            </View>
            <View style={styles.areaBottom}>

            </View>
          </View>
          
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  body: {
    flex:9,
    width:'100%',
    height:'100%',
  },
  header:{
    flex:1,
  },
  content: {
   flex: 1,
   //marginTop: 40
  },
  control: {
    color:'#2196F3',
    fontSize: 30,
   // fontWeight: 'bold',
    paddingLeft:20,
  },
  nameRoom: {
    fontSize:15,
    color:'gray'
  },
  add: {
    flex:1, //e6eaeb
    justifyContent:'center',
    backgroundColor: 'white',
    marginLeft: 80,
    marginRight:80,
    borderRadius:100,
    shadowColor:'black',
    shadowOpacity:0.4,
    shadowRadius: 5,
    shadowOffset: {width:0, height:4},
    elevation: 9,
  },
  other: {
    flex: 9,
  },
  areafan: {
    flex:2,
    flexDirection:'row',
    alignItems: 'center' ,
    
    justifyContent: 'space-around'
  },
  areaOther:{
    flex:2,
    flexDirection:'row',
    justifyContent: 'space-around'
   
  },
  areaBottom:{
    flex:1
  },
  fan:{
    width: 165,
    height: 165,
  

    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'black',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftColor: 'black',
    borderLeftWidth: StyleSheet.hairlineWidth,

    borderRadius:20
  },
  imageFan: {
    width:100,
    height:100,
    marginLeft:30
  },
  imageDieuhoa:{
    width:150,
    height:100,
    marginLeft:8
  }
});

