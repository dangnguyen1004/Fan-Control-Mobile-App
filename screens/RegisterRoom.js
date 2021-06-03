import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import  firebase from 'firebase/app'

export default class ChooseRoom extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentUserData:{},
        }
    }
    componentDidMount = async() => {
        const {route} = this.props
        const user = route.params.user

        const currentUserData = await firebase
        .database()
        .ref('users')
        .child(users.uid)
        .once('value')

    }

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.header}>
                  <View style={styles.contentHeader}> 
                    <View style={{  flex:1,  flexDirection:'row', justifyContent:'space-between', marginRight:20}}>
                      <Text style={{marginLeft:20, fontSize:35, color:'#2196F3'}}>Register room</Text>
                    </View>
                    <View style={{ flex:1}}>
                      <Text style={{marginLeft:20, fontSize:15, color:'gray'}}>Choose room</Text> 
                    </View>
                  </View>   
              </View> 
              <View style={styles.body}>
                  
                <Text style= {{color:'gray'}}>Building</Text>            
                <View style={styles.room}> 
                            <TextInput style={styles.search} placeholder=' H1'
                            ></TextInput>
                      </View>
                 
                <Text style= {{color:'gray', marginTop:20,}}>Room</Text>
                <View style={styles.room}> 
                            <TextInput style={styles.search} placeholder=' 202'
                            ></TextInput>
                      </View>
               
                <View style={{marginTop: 20, marginRight:20, justifyContent:'center'}}>  
                      <View style={{flex:1}}> 
                        <Button title='Register room' style={{
                          borderRadius: 50
                        }}></Button>
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
      header: {
        flex: 1,
      },
      imageHeader: {
        flex: 1,
        resizeMode:'contain'
      },
      contentHeader: {
        flex: 2,
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
        flex: 5,
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
        flexDirection:'row',
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
    