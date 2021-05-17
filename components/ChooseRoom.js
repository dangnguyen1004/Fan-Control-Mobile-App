import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button, TextInput, ScrollView } from 'react-native';

import blue from '../assets/blue.png'

import { AntDesign } from '@expo/vector-icons';

export default function ChooseRoom ({navigation}) {
    return (
        <View style={styles.container}>
          
          <View style={styles.header}>
            <View style={styles.imageHeader}>
                  
                  <Image source={blue} style={{width:'100%', height: '100%'}}></Image>
              </View>

              <View style={styles.contentHeader}>
             
                <Text style={{marginLeft:20, fontSize:35, color:'#2196F3'}}>Control</Text>
                <Text style={{marginLeft:20, fontSize:15, color:'gray'}}>Choose room</Text>
                
              </View>
             
              <View style={styles.searchContent}>
                <TouchableOpacity style={{
                    position:'absolute',
                    top:3,
                    right: 60,
                    zIndex:10,
                    elevation: 9,
                  }}>
                  <AntDesign name="search1" size={24} color="black"/>
                </TouchableOpacity>
                <TextInput style={styles.search} placeholder='  Search'></TextInput>

              </View>    
          </View> 
          <View style={styles.body}>
              
                <Text style= {{color:'gray'}}>H1</Text>
                
                <TouchableOpacity onPress={()=> navigation.navigate('CONTROL DEVICE')}>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1}}>Room 101 - H1 </Text>
                    <AntDesign  name="arrowright" size={30} color="blue" style={{flex:1, textAlign:'right'}}/> 
                  </View>
             
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1}}>Room 102 - H1 </Text>
                    <AntDesign  name="arrowright" size={30} color="blue" style={{flex:1, textAlign:'right'}}/> 
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1}}>Room 103 - H1 </Text>
                    <AntDesign  name="arrowright" size={30} color="blue" style={{flex:1, textAlign:'right'}}/> 
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1}}>Room 104 - H1 </Text>
                    <AntDesign  name="arrowright" size={30} color="blue" style={{flex:1, textAlign:'right'}}/> 
                  </View>
                </TouchableOpacity>
             
                <Text style= {{color:'gray', marginTop:20}}>H2</Text>
                <TouchableOpacity>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1}}>Room 101 - H2 </Text>
                    <AntDesign  name="arrowright" size={30} color="blue" style={{flex:1, textAlign:'right'}}/> 
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1}}>Room 102 - H2 </Text>
                    <AntDesign  name="arrowright" size={30} color="blue" style={{flex:1, textAlign:'right'}}/> 
                  </View>
                </TouchableOpacity> 
          </View>
        
        </View>
      
    );
  }
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    flex: 1,
  },
  imageHeader: {
    flex: 1,
    resizeMode:'contain'
  },
  contentHeader: {
    flex: 2
  },
  searchContent: {
    flex: 2,
    alignItems:'center',
    marginTop: 40,
  },
  search:{
    height:30,
    width: '70%',
    backgroundColor:'#fff',
    borderRadius: 40,
    textAlign:'center',
    elevation: 9,
    
  },
  body:{
    flex: 2,
    marginLeft: 20
  },
  room:{
    marginTop: 10,
    width: '90%',
    height:30,
    backgroundColor: 'white',
    borderRadius:50,
    elevation: 9,
    justifyContent: 'center',
    flexDirection:'row'
  }
});

