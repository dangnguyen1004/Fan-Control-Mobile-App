import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SectionList } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RequestDenyAction from '../components/RequestDenyAction';
import { useState } from 'react';
import { useEffect } from 'react';
import AccountItemSeparator from '../components/AccountItemSeparator';
import firebase from '../firebase/connectFirebase'
import moment from 'moment'


function ManageAccessScreen({ navigation }) {
    const [data, setData] = useState([])

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const sendNotification = async (token, room) => {
        var data = {
            token: token,
            room: room,
        }

        fetch("http://192.168.1.17:3000/api/revoke", {
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

    const handleRevoke = async (email, uid, roomName) => {
        //write admin log
        console.log('Revoke ' + uid + ' from room ' + roomName)
        firebase.database().ref('logs/' + color.adminUid).push({
            time: getCurrentTime(),
            log: 'You revoked control room ' + roomName + ' of ' + email,
        })

        // notify to user
        let user = await firebase.database().ref('users/' + uid).once('value')
        sendNotification(user.val().tokenPushNotifications, roomName)
        firebase.database().ref('users/' + user.val().uid).child('notifications').push('You have been revoked control of room ' + roomName)

        // remove uid from list user of this room
        let room = await firebase.database().ref('rooms/' + roomName).once('value')
        firebase.database().ref('rooms/' + roomName).child('users').set(
            room.val().users.filter(item => item.uid != uid)
        )

        // remove room from controllableRooms of user
        firebase.database().ref('users/' + uid).child('controllableRooms').set(
            user.val().controllableRooms.filter(item => item != roomName)
        )


    }

    const getData = async () => {
        firebase.database().ref('rooms').on('value', snapshot => {
            if (snapshot.val()) {
                let roomUsers = []
                Object.values(snapshot.val()).forEach(room => {
                    roomUsers.push({
                        title: room.name,
                        data: room.users ? room.users : [],
                    })
                })
                setData(roomUsers)
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color={color.black}></MaterialCommunityIcons>
                </TouchableOpacity>
                <Text style={styles.logo}>Manage Access</Text>
            </View>
            <SectionList
                style={styles.listDevices}
                sections={data}
                keyExtractor={(item, index) => item + index}
                ItemSeparatorComponent={AccountItemSeparator}
                SectionSeparatorComponent={() => <View style={{ marginTop: 10, }}></View>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{title}</Text>
                )}
                renderItem={({ item, section }) => (
                    <Swipeable renderRightActions={() => <RequestDenyAction onPress={() => handleRevoke(item.email, item.uid, section.title)} />}>
                        <View style={{ marginTop: 10, marginBottom: 10, }}>
                            <Text style={{ fontSize: color.fontSize }}>{item.email}</Text>
                        </View>
                    </Swipeable>
                )}
            ></SectionList>

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
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
    },
    listDevices: {
        width: '100%',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
    }
});

export default ManageAccessScreen;