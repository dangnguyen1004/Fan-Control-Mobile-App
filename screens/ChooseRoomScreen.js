import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AccountItemSeparator from '../components/AccountItemSeparator';
import firebase from '../firebase/connectFirebase'
import { useEffect } from 'react';
import { useState } from 'react';

function ChooseRoomScreen({ navigation }) {
    const [roomsNew, setRoomsNew] = useState()
    let roomsData

    const getRoomsData = () => {
    }
    
    useEffect(() => {
        let data
        const roomsRef = firebase.database().ref('rooms')
        roomsRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                data = snapshot.val()
                setRoomsNew(Object.values(data));
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


    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>YOUR ROOMS</Text>
            <AppButton
                title='Add new room'
                onPress={handleAdd}
            ></AppButton>
            <FlatList
                style={styles.listRooms}
                data={roomsNew}
                keyExtractor={item => item.name.toString()}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={
                        navigation.navigate('ControlRoom', { room: item.name.toString() })
                    }>
                        <View style={styles.room}>
                            <Text style={{ fontSize: color.fontSize }}>{item.name.toString()}</Text>
                            <MaterialCommunityIcons name='chevron-right' size={30} ></MaterialCommunityIcons>
                        </View>
                    </TouchableOpacity>
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