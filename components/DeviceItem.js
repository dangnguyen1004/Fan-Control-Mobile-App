import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, DeviceEventEmitter, Switch } from 'react-native';
// import ToggleSwitch from 'toggle-switch-react-native'
import color from '../config/color';
// import Switch from "react-switch";
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import { useEffect } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RoomDeleteAction from './RoomDeleteAction';
import moment from 'moment'


function DeviceItem({ item, onPressDelete, roomName, onPress }) {
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

    const onToggle = () => {
        let setStatus = isOn ? false : true
        let turnTo = isOn ? 'turned off ' : 'turned on '

        //update firebase
        deviceRef.child('isOn').set(setStatus)

        //write admin log
        firebase.database().ref('logs/' + color.adminUid).push({
            time: getCurrentTime(),
            log: 'You ' + turnTo + item.id + ' in room ' + roomName
        })

        // send to my server to send to adafruit server
        sendDataToServer(item.feed, setStatus)
    }

    return (
        <Swipeable renderRightActions={() => <RoomDeleteAction onPress={onPressDelete}></RoomDeleteAction>}>
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
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
        </Swipeable>
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

export default DeviceItem;