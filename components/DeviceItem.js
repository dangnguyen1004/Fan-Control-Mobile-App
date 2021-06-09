import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, DeviceEventEmitter, Switch } from 'react-native';
// import ToggleSwitch from 'toggle-switch-react-native'
import color from '../config/color';
// import Switch from "react-switch";
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import { useEffect } from 'react';


function DeviceItem({ item }) {
    const [device, setDevice] = useState()
    const [isOn, setIsOn] = useState(false)

    const typeDevice = item.type === 'fan' ? 'fans' : 'airCons'
    const endPoint = typeDevice + '/' + item.id
    const deviceRef = firebase.database().ref(endPoint)

    const getDeviceFromFireBase = () => {
        deviceRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                setDevice(snapshot.val())
                setIsOn(snapshot.val().isOn)
            }
        })
    }

    useEffect(() => {
        getDeviceFromFireBase()
    }, [])

    const onToggle = () => {
        let setStatus = isOn ? false : true
        deviceRef.child('isOn').set(setStatus)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={{
                    fontSize: color.fontSize,
                }}>{item.id}</Text>
            </TouchableOpacity>
            {/* <ToggleSwitch
                isOn={device.isOn}
                onColor="green"
                offColor="red"
                size="large"
                onToggle={onToggle}
            /> */}
            {/* <Switch onChange={onToggle} checked={isOn} /> */}
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

export default DeviceItem;