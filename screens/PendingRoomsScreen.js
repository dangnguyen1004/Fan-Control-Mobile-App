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


function PendingRoomsScreen({ navigation }) {
    const [pendingRooms, setPendingRooms] = useState([])

    const getPendingRooms = async () => {
        let user = await firebase.auth().currentUser
        console.log(user)
        firebase.database().ref('users/' + user.uid).on('value', snapshot => {
            if (snapshot.val().pendingRooms) setPendingRooms(snapshot.val().pendingRooms)
        })
    }

    useEffect(() => {
        getPendingRooms()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color={color.black}></MaterialCommunityIcons>
                </TouchableOpacity>
                <Text style={styles.logo}>Pending rooms</Text>
            </View>

            <FlatList
                style={styles.listRooms}
                data={pendingRooms}
                keyExtractor={item => item}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => <RoomDeleteAction onPress={() => {
                        console.log('Delete request room: ' + item)
                    }} />}>
                        <TouchableOpacity onPress={
                            () => console.log('Request room ' + item)
                        }>
                            <View style={styles.room}>
                                <Text style={{ fontSize: color.fontSize }}>{item}</Text>
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
        backgroundColor: color.white,
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
    }
});

export default PendingRoomsScreen;