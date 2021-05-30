import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { ActionSheetIOS } from 'react-native';
import firebase from 'firebase/app'

export default class ChooseRoom extends Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUser: {},

      isAddNewBookVisible : false,
      textInputData: '',
      rooms:[]
    }
  }
  componentDidMount = async () => {
    const user =  this.props.route.params.user

    const currentUserData = await firebase.database().ref('users').child(user.uid).once('value')

    
    this.setState({currentUser: currentUserData.val()})
  }

  showAddNewRoom = () => {
    this.setState({isAddNewBookVisible:true})
  }
  hideAddNewRoom = () => {
    this.setState({isAddNewBookVisible:false})
  }
  addRoom = async room => {
    try{
      // room id === key
      const snapshot = await firebase
        .database()
        .ref('rooms')
        .child(this.state.currentUser.uid)
        .orderByChild('name')
        .equalTo(room)
        .once('value');
      
      if (snapshot.exists()) {
        alert('Unable to register as room already exits')
      } else {
        const roomID = await firebase
          .database()
          .ref('rooms')
          .child(this.state.currentUser.uid)
          .push()
          .key

        const response = await firebase
          .database()
          .ref('rooms')
          .child(this.state.currentUser.uid)
          .child(roomID)
          .set({name: room, manager:this.state.currentUser.username, phone:this.state.currentUser.phone, register:true})
      }
    } catch(error) {
       alert(error)
    }
    // this.setState((state, props) => ({
    //   rooms: [...state.rooms, room]
    // }), () => {
    //   alert(this.state.rooms)
    // })
  }
  deleteRoom = (selectRoom, index) => {
    let newList = this.state.rooms.filter(room => room !==
    selectRoom );
    this.setState(prevState => ({
      rooms: newList
    }));
  }
  renderItem = (item, index) => (
    <View style={{height:50, flexDirection:'row', marginTop:10}}>
      <View style={{flex:1, justifyContent:'center', backgroundColor:'white'}}>
        <Text style={{paddingLeft:20, fontSize:20}}>{"Room " + item} </Text>
      </View>
      
      <TouchableOpacity onPress={() => this.addRoom(this.state.textInputData)}>
        <View style={{width:100, height:50, backgroundColor:'#007AFF', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontWeight:'bold', color:'white'}}>Control Room</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.deleteRoom(item,index)}>
        <View style={{width:100, height:50, backgroundColor:'#a5deba', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontWeight:'bold', color:'white'}}>Delete Room</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
  render() {
    return (
        <View style={{flex:1}}>
          <View style={{marginBottom:20, marginTop:20}}>
            <Text style={{color:'#007AFF',fontWeight:'bold', fontSize:20, textAlign:'center'}}>CHOOSE ROOM TO CONTROL</Text>
          </View>
          {this.state.isAddNewBookVisible && (
          <View style={{height:50, flexDirection:'row'}}>

            <TextInput style={{flex:1, backgroundColor:'white', paddingLeft:5}}
            placeholder="Enter Room Name: 102-H1"
            placeholderTextColor="grey"
            onChangeText={text => this.setState({textInputData:text})}
            />
          <TouchableOpacity onPress={() => this.addRoom(this.state.textInputData)}>
            <View style={{width:50, height:50, backgroundColor:'#a5deba', alignItems:'center', justifyContent:'center'}}>
              <Ionicons name='ios-checkmark' color='white' size={40}></Ionicons>
            </View>
          </TouchableOpacity>
            <TouchableOpacity onPress={this.hideAddNewRoom}>
              <View style={{width:50, height:50, backgroundColor:'#deada5', alignItems:'center', justifyContent:'center'}}>
                <Ionicons name='ios-close' color='white' size={40}></Ionicons>
              </View>
            </TouchableOpacity>
          </View>
          )}
          <FlatList 
            data={this.state.rooms}
            renderItem={({item}, index)=> this.renderItem(item, index)}
            ListEmptyComponent = {
              <View style={{marginTop: 50, alignItems:'center'}}> 
                <Text style={{fontWeight:'bold'}}>You have not booked any rooms yet</Text>
              </View>
            }
          />
          <TouchableOpacity style={{position:'absolute', right:20, bottom:20}} 
            onPress={this.showAddNewRoom}>
            <View style={{width:50, height:50, borderRadius:25, backgroundColor:'#AAD1E6', alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:'white', fontSize:30}}>+</Text>
            </View>
          </TouchableOpacity>

        </View>
    );
  }
}

