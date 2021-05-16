import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableHighlight, Text, TouchableOpacity } from 'react-native';
import BlueBackground from '../components/BlueBackground';
import OnOffButton from '../components/OnOffButton'
import BackButton from '../components/BackButton';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import colors from '../config/color'
import SettingDetail from '../components/SettingDetail';

function switchFan(status) {
    const levelOfFan = status === 'OFF'? 0 : 3;
    const data = {
        level: status,
        data: 10
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        mode: "no-cors",
    };
    fetch('http://127.0.0.1:3000/api/fan', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

function FanControl(props) {
    const [fanStatus, setFanStatus] = useState('OFF');
    return (
        <BlueBackground>
            <BackButton></BackButton>
            {/* <FontAwesome5 style={styles.icon} name="fan" size={120} color="white" /> */}
            <MaterialCommunityIcons style={styles.icon} name="fan" size={120} color="white" />
            <View style={styles.whiteBackground}></View>
            <View style={styles.OnOffButtonContainer}>
                <OnOffButton status={fanStatus} onPress={() => {
                    if (fanStatus === 'OFF') {
                        setFanStatus('ON')
                        switchFan(fanStatus)
                    }
                    else { 
                        setFanStatus('OFF')
                        switchFan(fanStatus) 
                    }
                }}></OnOffButton>
            </View>
            <View style={styles.settings}>
                <SettingDetail detail='Auto mode' value='Change'></SettingDetail>
                <SettingDetail detail='Device id' value='F2546'></SettingDetail>
                <SettingDetail detail='Room' value='805 - H1'></SettingDetail>
                <SettingDetail detail='Name' value='Quạt trần nha'></SettingDetail>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton style={{
                    marginBottom: 10,
                }} title='Change limit temp & humidity' onPress={() => console.log('change limit')}></AppButton>
                <AppButton title='Delete device' onPress={() => console.log('delete')}></AppButton>
            </View>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    whiteBackground: {
        width: '100%',
        height: 800,
        position: 'absolute',
        top: 250,
        backgroundColor: 'white',
        elevation: 5,
    },
    OnOffButtonContainer: {
        position: 'absolute',
        top: 200,
        alignSelf: 'center',
    },
    icon: {
        position: 'absolute',
        top: 50,
        alignSelf: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
    },
    settings: {
        width: '100%',
        position: 'absolute',
        top: 350,
        padding: 20,
    }
})

export default FanControl;