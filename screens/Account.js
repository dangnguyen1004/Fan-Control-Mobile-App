import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import  firebase from 'firebase/app'
import 'firebase/auth'
import AssetExample from '../server/AssetExample';

export default class ChooseRoom extends Component{
  constructor(props) {
    super(props)
    this.state = {
      currentuser: {}
    }
  }
  signout = async () => {
    try {
      await firebase.auth().signOut()
      this.props.navigation.replace('SIGN IN')
    } catch (error) {
      alert('Unable to sign out')
    }
  }

  passDataToChooseRoom = () => {
    const user =  this.props.route.params.user
    this.props.navigation.navigate('CHOOSE ROOM', {user})
  }

  componentWillMount = async () => {
    const user =  this.props.route.params.user

    const userdata = await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .once('value')
    
    this.setState({currentuser:userdata.val() })
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
              <View style={styles.contentHeader}> 
                <View style={{  flex:1,  flexDirection:'row', justifyContent:'space-between', marginRight:20}}>
                  <Text style={{marginLeft:20, fontSize:35, color:'#2196F3'}}>Account</Text>
                  <TouchableOpacity onPress={this.signout}>
                    <AntDesign name="logout" size={30} color="#2196F3" style={{marginTop:10}}/>
                  </TouchableOpacity>
                </View>
                <View style={{ flex:1}}>
                  <Text style={{marginLeft:20, fontSize:15, color:'gray'}}>Infomation user</Text> 
                </View>
              </View>   
          </View> 
          <View style={styles.body}>
              
                <Text style= {{color:'gray'}}>Name</Text>            
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1, marginTop: 5}}>{this.state.currentuser.username}</Text>
                  </View>
             
                <Text style= {{color:'gray', marginTop:20,}}>Phone</Text>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1,  marginTop: 5}}>{this.state.currentuser.phone}</Text>
                  </View>

                <Text style= {{color:'gray', marginTop:20}}>Privacy</Text>
                  <View style={styles.room}> 
                    <Text style={{paddingLeft:20, flex: 1,  marginTop: 5}}>User</Text>
                  </View>
                
                <View style={{marginTop: 20, marginRight:20, flexDirection:'row', justifyContent:'space-around'}}>  
                  <View style={{flex:1}}>
                    <Button title='Control' style={{
                      borderRadius: 50 
                    }} onPress = {this.passDataToChooseRoom}></Button>
                  </View>
                </View>
              
              
              <AssetExample></AssetExample>
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
  }
});

