import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react';
import firebase from '../firebase/connectFirebase'
import { useEffect } from 'react';
import DeviceButton from '../components/DeviceButton';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import AppButton from '../components/AppButton';
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons';


function ControlDeviceScreen({ navigation, route }) {
    const { item } = route.params
    const [device, setDevice] = useState()
    const [feed, setFeed] = useState()
    const [errorFeed, setErrorFeed] = useState()
    const [isOn, setIsOn] = useState()

    const getDevice = async () => {
        firebase.database().ref(item.type.toString() + 's/' + item.id).on('value', snapshot => {
            if (snapshot.val()) {
                setDevice(snapshot.val())
                setFeed(snapshot.val().feed)
                setIsOn(snapshot.val().isOn)
            }
        })
    }

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const handleUpdate = () => {
        if (!feed) {
            setErrorFeed('Feed is required')
            return
        }

        // update to database
        firebase.database().ref(item.type.toString() + 's/' + item.id).child('feed').set(feed)

        // write log
        firebase.database().ref('logs/' + color.adminUid).push({
            time: getCurrentTime(),
            log: 'You update feed of device ' + item.id,
        })

        navigation.goBack()
    }

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

    const handlePress = async () => {
        let setState = isOn ? false : true
        let setStateLog = isOn ? 'turned off ' : 'turned on '
        let type = item.type == 'fan' ? 'fans' : 'airCons'

        // write log
        let user = await firebase.auth().currentUser
        firebase.database().ref('logs/' + user.uid).push({
            time: getCurrentTime(),
            log: 'You ' + setStateLog + ' ' + item.id,
        })

        //update firebase
        firebase.database().ref(type + '/' + item.id).child('isOn').set(setState)

        // send to server 
        sendDataToServer(item.feed, setStateLog)
    }

    useEffect(() => {
        getDevice()
    }, [])

    return (
        <>
            <View style={styles.headerContainer}>
                <ImageBackground style={styles.image} source={require('../assets/BackgroundDevice.png')}>
                    <View style={styles.logoContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <MaterialCommunityIcons name='chevron-left' size={40} color={color.white}></MaterialCommunityIcons>
                        </TouchableOpacity>
                        <Text style={styles.logo}>Device settings</Text>
                    </View>
                    <View style={styles.deviceIcon}>
                        {item.type == 'airCon' ? <MaterialCommunityIcons name="air-conditioner" size={50} color="white" /> : <FontAwesome5 name="fan" size={50} color="white" />}
                    </View>
                    <View style={styles.deviceButton}>
                        <DeviceButton
                            onPress={handlePress}
                            state={isOn}
                        ></DeviceButton>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.feedContainer}>
                <InputField
                    placeholder="Device's feed"
                    onChangeText={(text) => { setFeed(text); setErrorFeed(null) }}
                    defaultValue={feed}
                    style={styles.input}
                ></InputField>
                <ErrorMessage
                    title={errorFeed}
                    visible={true}
                ></ErrorMessage>

                <AppButton
                    title='Update device feed'
                    onPress={handleUpdate}
                ></AppButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0.3,
        width: '100%',
        alignItems: 'center',
        backgroundColor: color.primary
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        color: color.white,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
    },
    deviceIcon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    deviceButton: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: -60,
    },
    feedContainer: {
        zIndex: -1,
        flex: 0.7,
        width: '100%',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: color.white,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        marginTop: 30,
        marginBottom: 10,
    }
});

export default ControlDeviceScreen;