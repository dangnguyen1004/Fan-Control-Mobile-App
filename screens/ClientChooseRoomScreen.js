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
import PendingButton from '../components/PendingButton'
import AddCircleButton from '../components/AddCircleButton';
import ViewLogButton from '../components/ViewLogButton';


function ClientChooseRoomScreen({ navigation }) {
    const [rooms, setRooms] = useState([])

    const getRooms = async () => {
        let user = await firebase.auth().currentUser
        firebase.database().ref('users/' + user.uid).on('value', snapshot => {
            if (snapshot.val().controllableRooms) setRooms(snapshot.val().controllableRooms)
            else setRooms([])
        })
    }

    const handleSearch = async (text) => {
        if (!text) {
            getRooms()
            return
        }
        let pattern = new RegExp(text, 'g');
        let searchResult = await rooms.filter(item => item.toString().match(pattern))
        setRooms(searchResult)
    }

    useEffect(() => {
        getRooms()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Dashboard</Text>

            <View style={styles.searchContainer}>
                <AddCircleButton onPress={() => navigation.navigate('RequestRoom')} ></AddCircleButton>
                <ViewLogButton onPress={() => navigation.navigate('PendingRooms')} style={{ marginLeft: 10, marginRight: 10, }}></ViewLogButton>
                <InputField
                    style={{ flex: 1 }}
                    placeholder='Search room'
                    onChangeText={handleSearch}
                ></InputField>
            </View>

            <FlatList
                style={styles.listRooms}
                data={rooms}
                keyExtractor={item => item}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={
                        () => navigation.navigate('ClientControlRoom', { roomName: item })
                    }>
                        <View style={styles.room}>
                            <Text style={{ fontSize: color.fontSize }}>{item}</Text>
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
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%'
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    pendingButton: {
        position: 'absolute',
        right: 0,
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
    searchContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        alignItems: 'center'
    }
});

export default ClientChooseRoomScreen;
