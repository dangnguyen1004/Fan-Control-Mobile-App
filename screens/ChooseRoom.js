import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { ActionSheetIOS } from 'react-native';
import firebase from 'firebase/app'
import {snapshotToArray} from '../firebase/LoadingData.js'


class ChooseRoom extends Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUser: {},

      isAddNewBookVisible : false,
      textInputData: '',
      rooms:[]
    }
  }

  componentWillMount = async () => {
    const user =  this.props.route.params.user

    const currentUserData = await firebase.database().ref('users').child(user.uid).once('value')

    const rooms = await firebase
      .database()
      .ref('showrooms')
      .child(user.uid)
      .once('value')

    const roomsArray = snapshotToArray(rooms)

    this.setState({currentUser: currentUserData.val(), rooms:roomsArray})
  }

  componentDidMount = async () => {
    // const user =  this.props.route.params.user

    // const currentUserData = await firebase.database().ref('users').child(user.uid).once('value')

    // const rooms = await firebase
    //   .database()
    //   .ref('showrooms')
    //   .child(user.uid)
    //   .once('value')

    // const roomsArray = snapshotToArray(rooms)

    // this.setState({currentUser: currentUserData.val(), rooms:roomsArray})
    
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
        .ref('checkrooms')
        .orderByChild('name')
        .equalTo(room)
        .once('value');
      
      if (snapshot.exists()) {
        alert('The room is already registered, please register another room')
      } else {
        const roomID = await firebase
          .database()
          .ref('showrooms')
          .child(this.state.currentUser.uid)
          .push()
          .key

        const showrooms = await firebase
          .database()
          .ref('showrooms')
          .child(this.state.currentUser.uid)
          .child(roomID)
          .set({name: room, manager:this.state.currentUser.username, phone:this.state.currentUser.phone, register:true})
     
        const checkrooms = await firebase
          .database()
          .ref('checkrooms')
          .child(room)
          .set({name: room, manager:this.state.currentUser.username, phone:this.state.currentUser.phone, register:true})
        
          this.uploadfirebase()

          alert('Register succecs')
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
  uploadfirebase = async () => {
    const rooms = await firebase
      .database()
      .ref('showrooms')
      .child(this.state.currentUser.uid)
      .once('value')

    const roomsArray = snapshotToArray(rooms)
    
    this.setState({rooms: roomsArray})
  }

  deleteRoom = (selectRoom, index) => {
    let newList = this.state.rooms.filter(room => room !==
    selectRoom );
    this.setState(prevState => ({
      rooms: newList
    }));
  }

  controlroom = (item, index) => {
    const user =  this.props.route.params.user
    let listitem = this.state.rooms.filter(room => room === item);
    this.props.navigation.navigate('CONTROL DEVICE', {user, listitem})
  }

  renderItem = (item, index) => (
    <View style={{height:50, flexDirection:'row', marginTop:10}}>
      <View style={{flex:1, justifyContent:'center', backgroundColor:'white'}}>
        <Text style={{paddingLeft:20, fontSize:20}}>{"Room " + item.name} </Text>
      </View>
      
      <TouchableOpacity onPress={() => this.controlroom(item, index)}>
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

// const mapStateToProps = state => {
//   return {
//     rooms: state.rooms
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     loadrooms: rooms => dispatch({type: 'LOAD_ROOMS_FROM_SERVER', payload: rooms})
//   }
// }

export default ChooseRoom;

