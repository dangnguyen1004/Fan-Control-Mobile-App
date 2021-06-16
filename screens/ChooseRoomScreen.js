import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AccountItemSeparator from '../components/AccountItemSeparator';
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import { useEffect } from 'react';
import InputField from '../components/InputField';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RoomDeleteAction from '../components/RoomDeleteAction';
import moment from 'moment'


function ChooseRoomScreen({ navigation }) {
    const [rooms, setRooms] = useState([])
    const [allUsers, setAllUsers] = useState()

    const getAllUsers = async () => {
        firebase.database().ref('users').on('value', snapshot => {
            if (snapshot.val()) setAllUsers(snapshot.val())
        })
    }

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const getRooms = async () => {
        const roomsRef = firebase.database().ref('rooms')
        roomsRef.on('value', snapshot => {
            if (snapshot.val()) {
                setRooms(Object.values(snapshot.val()))
            }
            else {
                setRooms([])
            }
        })
    }

    useEffect(() => {
        getRooms()
        getAllUsers()
    }, [])

    const handleAdd = () => {
        navigation.navigate('AddRoom')
    }

    const handleDelete = async (room) => {
        // write admin log
        firebase.database().ref('logs/' + color.adminUid).push({
            time: getCurrentTime(),
            log: 'You deleted room ' + room.name,
        })

        // remove from controllableRoom of all users
        let listUid = Object.keys(allUsers)
        for (let i = 0; i < listUid.length; i++) {
            let user = await firebase.database().ref('users/' + listUid[i]).once('value')
            if (user.val().controllableRooms) {
                firebase.database().ref('users/' + listUid[i]).child('controllableRooms').set(user.val().controllableRooms.filter(item => item != room.name))
            }
        }

        // remove room's devices
        if (room.listFans)
            room.listFans.forEach(fan => firebase.database().ref('fans/' + fan).remove())
        if (room.listAirCon)
            room.listAirCon.forEach(airCon => firebase.database().ref('airCons/' + airCon).remove())

        // remove room
        firebase.database().ref('rooms/' + room.name).remove()
    }

    const createAlertDelete = (room) =>
        Alert.alert(
            "Delete ?",
            "Please ensure and confirm!",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => handleDelete(room)
                }
            ],
            { cancelable: false }
        );

    const handleSearch = async (text) => {
        if (!text) {
            getRooms()
            return
        }
        let pattern = new RegExp(text, 'g');
        let searchResult = await rooms.filter(item => item.name.toString().match(pattern))
        setRooms(searchResult)
    }

    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Dashboard</Text>
            <AppButton
                title='Add new room'
                onPress={handleAdd}
            ></AppButton>

            <InputField
                placeholder='Search room'
                onChangeText={handleSearch}
            ></InputField>

            <FlatList
                style={styles.listRooms}
                data={rooms}
                keyExtractor={item => item.name.toString()}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => <RoomDeleteAction onPress={() => {
                        console.log('Delete room ' + item.name.toString())
                        createAlertDelete(item)
                    }} />}>
                        <TouchableOpacity onPress={
                            () => navigation.navigate('ControlRoom', { roomName: item.name.toString() })
                        }>
                            <View style={styles.room}>
                                <Text style={{ fontSize: color.fontSize }}>{item.name.toString()}</Text>
                                <MaterialCommunityIcons name='chevron-right' size={30} ></MaterialCommunityIcons>
                            </View>
                        </TouchableOpacity>
                    </Swipeable>
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
        marginBottom: 20,
    },
    listRooms: {
        width: '100%',
        marginTop: 20,
    },
    room: {
        width: '100%',
        height: 50,
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: color.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default ChooseRoomScreen;

