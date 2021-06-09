import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, FlatList, TextComponent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import SwitchSelector from 'react-native-switch-selector'
import firebase from 'firebase/app'
import { Ionicons } from '@expo/vector-icons'
import { snapshotToArray } from '../firebase/LoadingData.js'
import { useNavigation } from '@react-navigation/core';

const options = [
  { label: "OFF", value: "0" },
  { label: "ON", value: "1" }
];

export default class ControlDevice extends Component {
  constructor() {
    super()
    this.state = {
      nameroom: "",
      textInputData: '',
      currentUser_control: {},
      devices: [],
      mode: '',
      temperature: '0',
      humid: '0',
      textFeed: 'EMPTY',
      userNameServer: '',
      keyServer: '',
      chekcfeed:{},
      checkEnterFeed: false
    }

  }

  componentWillMount = async () => {
    const user = this.props.route.params.user
    const room = this.props.route.params.listitem
    const userNameServer = this.props.route.params.userNameServer
    const activeKey = this.props.route.params.activeKey
    this.setState({ userNameServer: userNameServer })
    this.setState({ keyServer: activeKey })

    const mqtt = require('mqtt');
    const client = mqtt.connect('mqtt://io.adafruit.com', {
      username: userNameServer,
      password: activeKey,
    });


    const currentUserData = await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .once('value')

    const devices = await firebase
      .database()
      .ref('devices')
      .child(user.uid)
      .child(room[0].name)
      .once('value')
    if (devices) {
      const devicesArray = snapshotToArray(devices)

      this.setState({ devices: devicesArray })
    }

    this.setState({ currentUser_control: currentUserData.val(), nameroom: room[0].name })

    const setTemAndHumid = (temp, humid) => {
      this.setState({
        temperature: temp,
        humid: humid
      })
    }

    const uploadModeInFirebase = () => {

    }
    
    const checkTempAndHumid = (temp, humid) => {
      if (temp > 30 || humid > 70) {
        console.log('bat quat do qua nhiet do')
        client.publish(this.state.textFeed, JSON.stringify({
          "id": "1",
          "name": "LED",
          "data": "1",
          "unit": ""
        }))

        uploadModeInFirebase() // là bật quạt
      }
    }

    client.on('connect', () => {
      client.subscribe(userNameServer.toString() + '/feeds/bk-iottemp-humid')
      alert('success')
      console.log('Subscribe CSE_BBC/feeds/bk-iot-temp-humid')
    })
    client.on('message', function (topic, message, packet) {
      // message is Buffer
      let data = JSON.parse(message.toString())
      console.log('Receive data from topic: ' + topic.toString())
      // console.log(data.data)
      const str = data.data;
      const pattTemp = /[0-9]*/;
      const pattHumid = /-[0-9]*/
      const temp = str.match(pattTemp)[0];
      const humid = str.match(pattHumid)[0].substr(1, 2);
      checkTempAndHumid(temp, humid)
      setTemAndHumid(temp, humid)
    })
  }

	deleteDevice = async (selectDevice, index) => {
		try {
			let deletedevice = this.state.devices.filter(device => device ===
				selectDevice);
			let newList = this.state.devices.filter(device => device !==
				selectDevice);
			await firebase 
				.database()
				.ref('devices')
				.child(this.state.currentUser_control.uid)
				.child(this.state.nameroom)
        .child(deletedevice[0].key)
				.remove();
			alert('Delete Success')
			this.setState(prevState => ({
				devices: newList
			}));
		} catch (error) {
			alert(error)
		}

	}
  
  renderItem = (item, index) => (
    <View style={{ height: 100, width: '100%', backgroundColor: '#a5deba', justifyContent: 'space-between', marginTop: 20 }}>
      <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <FontAwesome5 name="fan" size={24} color="25" />
          <Text style={{ marginLeft: 10, fontSize: 20, color: '#007AFF', fontWeight: 'bold' }}>{item.name}</Text>
        </View>

        <View style={{ width: '40%', alignItems:'center', flexDirection:'row', justifyContent:'space-between' }}>
          <View style={{flex:1 }}> 
            <SwitchSelector
              backgroundColor='gray'
              options={options}
              initial={item.mode}
              onPress={value => {
                this.checkmode(item, index, value)
              }}
            />
          </View>  
          <TouchableOpacity onPress={() => this.deleteDevice(item, index)}>
            <View style={{ width: 50, height: 50, backgroundColor: '#deada5', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='ios-close' color='white' size={40}></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <TextInput style={{flex:1, backgroundColor: '#deada5', paddingLeft: 5, width: '100%', height:'100%' }}
          placeholder={"feed: " + item.feed}
          placeholderTextColor="grey"
          onChangeText={text => this.setState({textFeed:text})
          }
        />
        <View style={{ alignItems:'center'}}>
          <Button title='Save Feed' onPress={() => this.updatefeed(item, index, this.state.textFeed)}></Button>
        </View>
      </View>
    </View>
  )
  updatefeed = async(item, index, text) => {
    if(text === 'EMPTY') {
      alert('Enter Feed')
    } else {
      let device_select = this.state.devices.filter(device => device === item);
      const update_feed = await firebase 
        .database()
        .ref('devices')
        .child(this.state.currentUser_control.uid)
        .child(this.state.nameroom)
        .child(device_select[0].key)
        .update({
          feed: text,
        })
        this.setState({textFeed:text, checkEnterFeed: true })
        alert('Save Success')
      }
  }
  checkmode = async (selectDevice, index, value ) => {
    let device_select = this.state.devices.filter(device => device === selectDevice);
    const room = this.props.route.params.listitem

    const devices = await firebase
      .database()
      .ref('devices')
      .child(this.state.currentUser_control.uid)
      .child(room[0].name)
      .child(device_select[0].key)
      .once('value')
    this.setState({chekcfeed: devices.val()})

    if (this.state.chekcfeed.feed === 'EMPTY') {
      alert("Please Enter Feed")
    }
    else {
      this.setState({checkEnterFeed: true})
      const update_mod = await firebase
        .database()
        .ref('devices')
        .child(this.state.currentUser_control.uid)
        .child(this.state.nameroom)
        .child(device_select[0].key)
        .update({
          mode: value,
        })
      const dataToAda = {
        "id": "1",
        "name": "LED",
        "data": value,
        "unit": ""
      }
      const mqtt = require('mqtt');
      const client = mqtt.connect('mqtt://io.adafruit.com', {
        username: this.state.userNameServer,
        password: this.state.keyServer,
      });
      client.publish(this.state.chekcfeed.feed, JSON.stringify(dataToAda));
    }

  }

  addDevice = async (device) => {
    if (device === "QUẠT TRÊN" || device === "QUẠT GIỮA" || device === "QUẠT DƯỚI") {

      try {
        const snapshot_device = await firebase
          .database()
          .ref('devices')
          .child(this.state.currentUser_control.uid)
          .child(this.state.nameroom)
          .orderByChild('name')
          .equalTo(device)
          .once('value');

        if (snapshot_device.exists()) {
          alert('The device is already exists, please add another device')
        } else {
          const deviceID = await firebase
            .database()
            .ref('devices')
            .child(this.state.currentUser_control.uid)
            .child(this.state.nameroom)
            .push()
            .key

          const devices = await firebase
            .database()
            .ref('devices')
            .child(this.state.currentUser_control.uid)
            .child(this.state.nameroom)
            .child(deviceID)
            .set({ name: device, manager: this.state.currentUser_control.username, phone: this.state.currentUser_control.phone, room: this.state.nameroom, mode: '0', feed: this.state.textFeed })

          this.uploadfirebase()
          alert('Add succecs')
        }
      } catch (error) {
        alert(error)
      }
    } else {
      alert('PLEASE ENTERN AGAIN, EXAMPLE: QUẠT TRÊN | GIỮA | DƯỚI')
    }
  }

  uploadfirebase = async () => {
    const devices = await firebase
      .database()
      .ref('devices')
      .child(this.state.currentUser_control.uid)
      .child(this.state.nameroom)
      .once('value')

    const devicesArray = snapshotToArray(devices)

    this.setState({ devices: devicesArray })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.control}>Control <Text style={{ fontSize: 15, color: 'grey' }}>{"Room " + this.state.nameroom}</Text> </Text>
          </View>
          <View style={{ height: 50, flexDirection: 'row', marginBottom: 20 }}>

            <TextInput style={{ flex: 1, backgroundColor: 'white', paddingLeft: 5 }}
              placeholder="Enter Device: QUẠT TRÊN"
              placeholderTextColor="grey"
              onChangeText={text => this.setState({ textInputData: text })}
            />
            <TouchableOpacity onPress={() => this.addDevice(this.state.textInputData)}>
              <View style={{ width: 50, height: 50, backgroundColor: '#a5deba', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name='ios-checkmark' color='white' size={40}></Ionicons>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ flex: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <MaterialCommunityIcons name="temperature-celsius" size={25} color="red" />
                <Text style={{ marginLeft: 10, fontSize: 20, color: 'red', fontWeight: 'bold' }}>TEMPERATURE</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>{this.state.temperature}</Text>
              </View>
            </View>
            <View>

            </View>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="water" style={{ fontSize: 25, color: '#007AFF' }}></Icon>
                <Text style={{ marginLeft: 10, fontSize: 20, color: '#007AFF', fontWeight: 'bold' }}>HUMIDITY</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, color: '#007AFF', fontWeight: 'bold' }}>{this.state.humid}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 7, marginTop: 10 }}>
            <FlatList
              data={this.state.devices}
              renderItem={({ item }, index) => this.renderItem(item, index)}
              ListEmptyComponent={
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>Not Have Devices</Text>
                </View>
              }
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    width: '100%',
    height: '100%',

  },
  content: {
    flex: 1,

  },
  control: {
    color: '#2196F3',
    fontSize: 30,
    // fontWeight: 'bold',
    paddingLeft: 20,
  },
  add: {
    flex: 1, //e6eaeb
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 100,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 9,
  },

});
