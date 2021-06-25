import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, DeviceEventEmitter, Switch } from 'react-native';
// import ToggleSwitch from 'toggle-switch-react-native'
import color from '../config/color';
// import Switch from "react-switch";
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import { useEffect } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment'
import RoomDeleteAction from './RoomDeleteAction';



function ClientDeviceItem({ item, roomName }) {
    const [isOn, setIsOn] = useState(false)

    const typeDevice = item.type === 'fan' ? 'fans' : 'airCons'
    const endPoint = typeDevice + '/' + item.id
    const deviceRef = firebase.database().ref(endPoint)

    const sendDataToServer = async (topic, isOn) => {
        var data = {
            topic: topic,
            isOn: isOn,
        }

        fetch("http://192.168.1.17:3000/api/control", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
    }

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const getDeviceFromFireBase = () => {
        deviceRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                setIsOn(snapshot.val().isOn)
            }
        })
    }

    useEffect(() => {
        getDeviceFromFireBase()
    }, [])

    const onToggle = async () => {
        let setStatus = isOn ? false : true
        let turnTo = isOn ? 'turned off ' : 'turned on '

        // update firebase
        deviceRef.child('isOn').set(setStatus)

        // write log to admin
        let user = await firebase.auth().currentUser
        firebase.database().ref('logs/' + user.uid).push({
            time: getCurrentTime(),
            log: 'You ' + turnTo + item.id + ' in room ' + roomName,
        })

        // send to my server to send to adafruit server
        sendDataToServer(item.feed, setStatus)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={{
                    fontSize: color.fontSize,
                }}>{item.id}</Text>
            </TouchableOpacity>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isOn ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggle}
                value={isOn}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default ClientDeviceItem;