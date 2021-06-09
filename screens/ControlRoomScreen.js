import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import AccountItemSeparator from '../components/AccountItemSeparator';
import AppButton from '../components/AppButton';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { } from '@expo/vector-icons';
import DeviceItem from '../components/DeviceItem';
import { useEffect } from 'react';
import firebase from '../firebase/connectFirebase'
import AccountItem from '../components/AccountItem';
import CancelButton from '../components/CancelButton';
import { MaterialCommunityIcons } from '@expo/vector-icons'

function ControlRoomScreen({ route, navigation }) {
    const [room, setRoom] = useState()
    const [roomName, setRoomName] = useState('H1 - 105')
    const [temperature, setTemperature] = useState()
    const [humidity, setHumidity] = useState()
    const [devices, setDevices] = useState()

    // let listFans, listAirCons

    const initData = () => {
        const { room } = route.params;
        const roomRef = firebase.database().ref('rooms/' + room)

        roomRef.on('value', snapshot => {
            if (snapshot.val()) {
                setRoom(snapshot.val())
                setRoomName(snapshot.val().name)
                setTemperature(snapshot.val().temperature)
                setHumidity(snapshot.val().humidity)

                let devices = []
                let maxDevices = 0
                if (snapshot.val().listFans) {
                    maxDevices = snapshot.val().listFans.length
                    console.log(maxDevices)
                    snapshot.val().listFans.forEach(element => {
                        const fansRef = firebase.database().ref('fans/' + element)
                        fansRef.on('value', snapshot => {
                            if (snapshot.val() && devices.length < maxDevices) {
                                devices.push(snapshot.val())
                            }
                        })
                    })
                }

                if (snapshot.val().listAirCon) {
                    maxDevices = maxDevices + snapshot.val().listAirCon.length
                    console.log(maxDevices)
                    snapshot.val().listAirCon.forEach(element => {
                        const airConsRef = firebase.database().ref('airCons/' + element)
                        airConsRef.on('value', snapshot => {
                            if (snapshot.val() && devices.length < maxDevices) {
                                devices.push(snapshot.val())
                            }
                        })
                    })
                }

                setDevices(devices.sort())
            }
        })
    }


    useEffect(() => {
        initData()
    }, [])


    const handleAdd = () => {
        navigation.navigate('AddDevice', { room: room })
    }

    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={25} color={color.primary}></MaterialCommunityIcons>
                    <Text style={{ fontSize: color.fontSize, color: color.primary }}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.logo}>{roomName}</Text>
            </View>
            <AppButton
                style={styles.button}
                title='Add new device'
                onPress={handleAdd}
            ></AppButton>
            <View style={{ width: '100%', marginBottom: 20, }}>
                <CancelButton
                    title='Manage room feed'
                    onPress={() => navigation.navigate('RoomFeed', { roomName: roomName })}
                ></CancelButton>
            </View>
            <View style={styles.temperature}>
                <Text style={{ fontSize: color.fontSize, color: color.danger, fontWeight: 'bold', }}>Temperature</Text>
                <Text style={{ fontSize: color.fontSize, color: color.danger, fontWeight: 'bold', }}>{temperature}oC</Text>
            </View>
            <View style={styles.temperature}>
                <Text style={{ fontSize: color.fontSize, color: color.primary, fontWeight: 'bold', }}>Humidity</Text>
                <Text style={{ fontSize: color.fontSize, color: color.primary, fontWeight: 'bold', }}>{humidity}%</Text>
            </View>
            <FlatList
                style={styles.listDevices}
                data={devices}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) => (
                    <DeviceItem
                        item={item}
                    ></DeviceItem>
                )}
            ></FlatList>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.white,
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginRight: 10,
    },
    temperature: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
        height: 50,
    },
    button: {
        marginBottom: 10,
    },
    listDevices: {
        width: '100%',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    }
});

export default ControlRoomScreen;

const devicesDeleted = [
    {
        value: 1,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 2,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 3,
        name: 'Fan 1',
        isOn: false,

    },
    {
        value: 4,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 5,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 6,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 7,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 8,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 9,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 10,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 11,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 12,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 13,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 14,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 15,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 16,
        name: 'Fan 1',
        isOn: false,
    },
]