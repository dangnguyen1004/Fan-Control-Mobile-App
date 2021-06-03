import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button, TextInput, ScrollView } from 'react-native';
import blue from '../assets/blue.png'

import { AntDesign } from '@expo/vector-icons';

export default function ChooseRoom ({navigation}) {
    // state = {
    //   type: '',
    //   name: '',
    //   mode: ''
    // }
  //itemsRef = firebase.child('DatabaseDevice')
    
    function AddDevice() {
        this.itemsRef.set({
          key:this.type
        })
    }
    return (
        <View style={styles.container}>
          
          <View style={styles.header}>
            <View style={styles.imageHeader}>
                <Image source={blue} style={{width:'100%', height: '100%'}}></Image>
              </View>

              <View style={styles.contentHeader}>
             
                <Text style={{marginLeft:20, fontSize:35, color:'#2196F3'}}>Add Device</Text>
                <Text style={{marginLeft:20, fontSize:15, color:'gray'}}>Add new devices</Text>
                
              </View>   
          </View> 
          <View style={styles.body}>
                <Text style= {{color:'gray'}}>Type</Text>  

                <View style={styles.type}>
                    <TextInput style={styles.search} placeholder=' Type: Fan or air'
                        // onChangeText={(type) => this.setState({type})}
                       // value={this.state.type}
                    ></TextInput>
                </View>  

                <Text style= {{color:'gray'}}>Name</Text>  

                <View style={styles.type}>
                    <TextInput style={styles.search} placeholder=' Name: Fan top'
                        //onChangeText={(name) => this.setState({name})}
                       // value={this.state.name}                    
                    ></TextInput>
                </View>  

                <Text style= {{color:'gray'}}>Mode</Text>  

                <View style={styles.type}>
                    <TextInput style={styles.search} placeholder=' Mode: auto'
                        //onChangeText={(mode) => this.setState({mode})}
                       // value={this.state.mode}                      
                    ></TextInput>
                </View>     
                
                <View style={{marginRight:30}}> 
                    <Button title="ADD" >
                    </Button>
                </View>                              
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
    flex: 2,
    resizeMode:'contain'
  },
  contentHeader: {
    flex: 3
  },
  body:{
    flex: 4,
    marginLeft: 20
  },
  type: {
    marginTop:20,
    marginBottom:20
  },
  search:{
    height:30,
    width: '90%',
    backgroundColor:'#fff',
    borderRadius: 40,
    elevation: 9,
  },

});

