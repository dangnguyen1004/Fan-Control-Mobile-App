import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react';
import { useEffect } from 'react';
import RoomDeleteAction from '../components/RoomDeleteAction';
import AccountItemSeparator from '../components/AccountItemSeparator';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import firebase from '../firebase/connectFirebase';
import RequestItem from '../components/RequestItem';
import AppButton from '../components/AppButton';


function GrantRoomsScreen({ navigation }) {
    const [requests, setRequests] = useState([])

    const handleAccept = async (email, uid, room, key) => {
        // remove from pending requests list 
        firebase.database().ref('pendingRequests/' + key).remove()

        // remove from list pending of user and append controllable 
        let user = await firebase.database().ref('users/' + uid).once('value')
        let newPendingRooms = await user.val().pendingRooms.filter(item => item != room)
        let newControllableRooms = user.val().controllableRooms ? [...user.val().controllableRooms, room] : [room]
        firebase.database().ref('users/' + uid).child('pendingRooms').set(newPendingRooms)
        firebase.database().ref('users/' + uid).child('controllableRooms').set(newControllableRooms)

        // append user to list user of room
        let listUsersOfRoom = await firebase.database().ref('rooms/' + room).child('users').once('value')
        let newListUsers = listUsersOfRoom.val() ? [...listUsersOfRoom.val(), {uid: uid, email: email}] : [{uid: uid, email: email}]
        firebase.database().ref('rooms/' + room).child('users').set(newListUsers)

        // Notice to user
        firebase.database().ref('users/' + uid).child('notifications').push('Admin has accepted your request to control room ' + room)
    }

    const handleDeny = async (email, uid, room, key) => {
        // remove from pending requests list 
        firebase.database().ref('pendingRequests/' + key).remove()

        // remove from list pending of user
        let user = await firebase.database().ref('users/' + uid).once('value')
        let newPendingRooms = await user.val().pendingRooms.filter(item => item != room)
        firebase.database().ref('users/' + uid).child('pendingRooms').set(newPendingRooms)

        // notice to user
        firebase.database().ref('users/' + uid).child('notifications').push('Admin has denied you request to control room ' + room)
    }

    const getRequests = async () => {
        firebase.database().ref('pendingRequests').on('value', snapshot => {
            if (snapshot.val()) setRequests(snapshot.val())
            else setRequests([])
        })
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Requests room</Text>
            </View>
            <AppButton
                title="Manage room access"
                onPress={() => navigation.navigate('ManageAccess')}
            ></AppButton>
            <FlatList
                style={styles.listRooms}
                data={Object.values(requests)}
                keyExtractor={item => item.user.toString() + item.requestRoom.toString()}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) =>
                    <RequestItem
                        item={item.user + ' request access room ' + item.requestRoom}
                        onAccept={() => handleAccept(item.user, item.uid, item.requestRoom, item.key)}
                        onDeny={() => handleDeny(item.user, item.uid, item.requestRoom, item.key)}
                    />}
            ></FlatList>

        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        paddingLeft: 10,
        paddingRight: 10,
    },
    logoContainer: {
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
    },
    listRooms: {
        width: '100%',
        marginTop: 20,
    },
});

export default GrantRoomsScreen;