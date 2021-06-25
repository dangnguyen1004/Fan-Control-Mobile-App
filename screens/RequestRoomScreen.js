import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import { useState } from 'react';
import AppButton from '../components/AppButton';
import AppPicker from '../components/AppPicker';
import CancelButton from '../components/CancelButton';
import ScreenTitle from '../components/ScreenTitle';
import firebase from '../firebase/connectFirebase'
import ErrorMessage from '../components/ErrorMessage';
import { useEffect } from 'react';
import moment from 'moment'
import color from '../config/color';



function RequestRoomScreen({ navigation }) {
    const [selectedBuilding, setSelectedBuilding] = useState()
    const [selectedRoom, setSelectedRoom] = useState()
    const [errorBuilding, setErrorBuilding] = useState()
    const [errorRoom, setErrorRoom] = useState()
    const [errorAdd, setErrorAdd] = useState()
    const [user, setUser] = useState()
    const [availableRooms, setAvailableRooms] = useState([])

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const handleRequest = async () => {
        if (!selectedBuilding) {
            setErrorBuilding('Build is required')
            return
        }
        if (!selectedRoom) {
            setErrorRoom('Room is required')
            return
        }

        // write log 
        let requestRoomName = selectedBuilding.label + '-' + selectedRoom.label
        console.log(user.name + 'request room ' + requestRoomName)
        firebase.database().ref('logs/' + user.uid).push({
            time: getCurrentTime(),
            log: 'You requested to access room ' + requestRoomName,
        })

        // check room is available
        if (!availableRooms.includes(requestRoomName)) {
            setErrorAdd(requestRoomName + ' is not available')
            return
        }

        // check already controllable room
        if (user.controllableRooms) {
            if (user.controllableRooms.includes(requestRoomName)) {
                setErrorAdd('This room is already controllable')
                return
            }
        }

        // append to pending list of user
        let newPendingRooms
        if (user.pendingRooms) {
            if (!user.pendingRooms.includes(requestRoomName)) newPendingRooms = [...user.pendingRooms, requestRoomName]
            else { setErrorAdd('This room is pending approval'); return; }
        }
        else newPendingRooms = [requestRoomName]
        firebase.database().ref('users/' + user.uid).child('pendingRooms').set(newPendingRooms)

        // append to request list of admin
        let newKey = await firebase.database().ref('pendingRequests').push({
            user: user.email,
            uid: user.uid,
            requestRoom: requestRoomName
        }).catch(error => setErrorAdd(error))
        firebase.database().ref('pendingRequests/' + newKey.key).child('key').set(newKey.key).then(() => navigation.goBack())
    }

    const getUser = async () => {
        let user = await firebase.auth().currentUser
        firebase.database().ref('users/' + user.uid).on('value', snapshot => {
            if (snapshot.val()) setUser(snapshot.val())
        })
    }

    const getAvailableRooms = async () => {
        firebase.database().ref('rooms').on('value', snapshot => {
            if (snapshot.val()) setAvailableRooms(Object.keys(snapshot.val()))
        })
    }

    useEffect(() => {
        getUser()
        getAvailableRooms()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.logo}>
                <ScreenTitle>Request room</ScreenTitle>
            </View>

            <ErrorMessage
                title={errorAdd}
                visible={true}
            ></ErrorMessage>

            <AppPicker
                items={buildings}
                selectedItem={selectedBuilding}
                placeholder='Choose building'
                onSelectItem={item => {
                    setSelectedBuilding(item)
                    setErrorBuilding(null)
                }}
            ></AppPicker>
            <ErrorMessage
                title={errorBuilding}
                visible={true}
            ></ErrorMessage>

            <AppPicker
                items={rooms}
                selectedItem={selectedRoom}
                onSelectItem={item => {
                    setSelectedRoom(item)
                    setErrorRoom(null)
                }}
                placeholder='Choose room'
            ></AppPicker>
            <ErrorMessage
                title={errorRoom}
                visible={true}
            ></ErrorMessage>

            <AppButton
                style={styles.button}
                title='Request'
                onPress={handleRequest}
            ></AppButton>

            <CancelButton
                title="Cancel"
                onPress={() => navigation.goBack()}
            ></CancelButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: color.white,
    },
    logo: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
    }
});

export default RequestRoomScreen;

const buildings = [
    {
        label: "H1",
        value: 1,
    },
    {
        label: "H2",
        value: 2,
    },
    {
        label: "H3",
        value: 3,
    },
    {
        label: "H6",
        value: 4,
    },
];

const rooms = [
    {
        label: "101",
        value: "1",
    },
    {
        label: "102",
        value: 2,
    },
    {
        label: "103",
        value: 3,
    },
    {
        label: "104",
        value: 4,
    },
    {
        label: "105",
        value: 5,
    },
    {
        label: "106",
        value: 6,
    },
    {
        label: "107",
        value: 7,
    },
    {
        label: "108",
        value: 8,
    },
    {
        label: "109",
        value: 9,
    },
    {
        label: "110",
        value: 10,
    },
    {
        label: "111",
        value: 11,
    },
    {
        label: "112",
        value: 12,
    },

];