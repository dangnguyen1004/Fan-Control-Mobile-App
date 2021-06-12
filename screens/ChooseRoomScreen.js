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


function ChooseRoomScreen({ navigation }) {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const roomsRef = firebase.database().ref('rooms')
        roomsRef.on('value', snapshot => {
            if (snapshot.val()) {
                let data = Object.values(snapshot.val())
                setRooms(Object.values(data))
            }
            else{
                setRooms([])
            }
        })
    }, [])
    // const roomsRef = firebase.database().ref('rooms')
    // roomsRef.on("value", function (snapshot) {
    //     console.log(snapshot.val());
    //     setRoomsNew(snapshot.val())
    // }, function (error) {
    //     console.log("Error: " + error.code);
    // });

    const handleAdd = () => {
        navigation.navigate('AddRoom')
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
                    text: "Yes", onPress: () => {
                        firebase.database().ref('rooms/' + room.name).remove()
                        if (room.listFans) 
                            room.listFans.forEach(fan => firebase.database().ref('fans/' + fan).remove())
                        if (room.listAirCon)
                            room.listAirCon.forEach(airCon => firebase.database().ref('airCons/' + airCon).remove())
                    }
                }
            ],
            { cancelable: false }
        );

    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Dashboard</Text>
            <AppButton
                title='Add new room'
                onPress={handleAdd}
            ></AppButton>

            <InputField
                placeholder='Search room'
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
                            () => navigation.navigate('ControlRoom', { room: item.name.toString() })
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

const rooms = [
    {
        value: 1,
        name: 'H2 - 105',
    },
    {
        value: 2,
        name: 'H2 - 105',
    },
    {
        value: 3,
        name: 'H2 - 105',
    },
    {
        value: 4,
        name: 'H2 - 105',
    },
    {
        value: 5,
        name: 'H2 - 105',
    },
    {
        value: 6,
        name: 'H2 - 105',
    },
    {
        value: 7,
        name: 'H2 - 105',
    }, {
        value: 8,
        name: 'H2 - 105',
    }, {
        value: 9,
        name: 'H2 - 105',
    }, {
        value: 10,
        name: 'H2 - 105',
    }, {
        value: 11,
        name: 'H2 - 105',
    }, {
        value: 12,
        name: 'H2 - 105',
    }, {
        value: 13,
        name: 'H2 - 105',
    }, {
        value: 14,
        name: 'H2 - 105',
    }, {
        value: 15,
        name: 'H2 - 105',
    }, {
        value: 16,
        name: 'H2 - 105',
    },
]