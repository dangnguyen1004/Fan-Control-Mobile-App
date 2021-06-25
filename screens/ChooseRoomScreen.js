import React from 'react';
import {
    View, StyleSheet,
    Text, FlatList,
    TouchableOpacity, Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import color from '../config/color';
import ScreenApp from '../components/ScreenApp';
import AccountItemSeparator from '../components/AccountItemSeparator';
import firebase from '../firebase/connectFirebase'
import InputField from '../components/InputField';
import RoomDeleteAction from '../components/RoomDeleteAction';
import AddCircleButton from '../components/AddCircleButton';
import ViewLogButton from '../components/ViewLogButton';


function ChooseRoomScreen({ navigation }) {
    const [users, setUsers] = useState()
    const [rooms, setRooms] = useState([])

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const getRoomsAndAllUsers = async () => {
        firebase.database().ref('users').on('value', snapshot => {
            if (snapshot.val()) {
                setUsers(snapshot.val())
            }
        })
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
        getRoomsAndAllUsers()
    }, [])

    const handleAdd = () => {
        navigation.navigate('AddRoom')
    }

    const handleDelete = async (room) => {
        console.log(users)
        // write admin log
        firebase.database().ref('logs/' + color.adminUid).push({
            time: getCurrentTime(),
            log: 'You deleted room ' + room.name,
        })

        // remove from controllableRoom of all users
        let listUid = Object.keys(users)
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
            getRoomsAndAllUsers()
            return
        }
        let pattern = new RegExp(text, 'g');
        let searchResult = await rooms.filter(item => item.name.toString().match(pattern))
        setRooms(searchResult)
    }

    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Dashboard</Text>

            <View style={styles.searchContainer}>
                <AddCircleButton onPress={handleAdd} ></AddCircleButton>
                <ViewLogButton onPress={() => navigation.navigate('ActivityLog')} style={{ marginLeft: 10, marginRight: 10, }}></ViewLogButton>
                <InputField
                    style={{ flex: 1, }}
                    placeholder='Room search'
                    onChangeText={handleSearch}
                ></InputField>
            </View>

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
        </ScreenApp >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.white,
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        alignItems: 'center'
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
    },
});

export default ChooseRoomScreen;

