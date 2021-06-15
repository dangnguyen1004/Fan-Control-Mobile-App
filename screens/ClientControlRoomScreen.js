import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, SectionList } from 'react-native';
import AccountItemSeparator from '../components/AccountItemSeparator';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import DeviceItem from '../components/DeviceItem';
import { useEffect } from 'react';
import firebase from '../firebase/connectFirebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ClientDeviceItem from '../components/ClientDeviceItem';


function ClientControlRoomScreen({ route, navigation }) {
    const { roomName } = route.params
    const [room, setRoom] = useState()
    const [temperature, setTemperature] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [devices, setDevices] = useState([])

    // let listFans, listAirCons

    const initData = async () => {
        firebase.database().ref('rooms/' + roomName).on('value', snapshot => {
            if (snapshot.val()) {
                setRoom(snapshot.val())
                setHumidity(snapshot.val().humidity)
                setTemperature(snapshot.val().temperature)
                let room = snapshot.val()

                firebase.database().ref().on('value', snapshot => {
                    if (snapshot.val()) {
                        let fanData = []
                        let airConData = []
                        if (room.listFans) fanData = Object.values(snapshot.val().fans).filter(item => room.listFans.includes(item.id))
                        if (room.listAirCon) airConData = Object.values(snapshot.val().airCons).filter(item => room.listAirCon.includes(item.id))
                        setDevices([
                            {
                                title: 'Fans',
                                data: fanData,
                            },
                            {
                                title: 'Air-Conditioner',
                                data: airConData,
                            }
                        ])
                    }
                })
            }
        })

    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color={color.black}></MaterialCommunityIcons>
                </TouchableOpacity>
                <Text style={styles.logo}>{room ? room.name : 'H1 -101'}</Text>
            </View>
            <View style={styles.temperature}>
                <Text style={{ fontSize: color.fontSize, color: color.danger, fontWeight: 'bold', }}>Temperature</Text>
                <Text style={{ fontSize: color.fontSize, color: color.danger, fontWeight: 'bold', }}>{temperature}oC</Text>
            </View>
            <View style={styles.temperature}>
                <Text style={{ fontSize: color.fontSize, color: color.primary, fontWeight: 'bold', }}>Humidity</Text>
                <Text style={{ fontSize: color.fontSize, color: color.primary, fontWeight: 'bold', }}>{humidity}%</Text>
            </View>
            <SectionList
                style={styles.listDevices}
                sections={devices}
                keyExtractor={(item, index) => item + index}
                ItemSeparatorComponent={AccountItemSeparator}
                SectionSeparatorComponent={() => <View style={{marginTop: 10,}}></View>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>{title}</Text>
                )}
                renderItem={({ item }) => (
                    <ClientDeviceItem
                        item={item}
                    ></ClientDeviceItem>
                )}
            ></SectionList>
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
        marginRight: '30%',
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

export default ClientControlRoomScreen;

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