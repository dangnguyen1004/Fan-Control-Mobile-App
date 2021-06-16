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
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Dashboard</Text>
                <PendingButton onPress={() => navigation.navigate('PendingRooms')}></PendingButton>
            </View>
            <AppButton
                title='Ask for access'
                onPress={() => navigation.navigate('RequestRoom')}
            ></AppButton>

            <InputField
                placeholder='Search room'
                onChangeText={handleSearch}
            ></InputField>

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%'
    },  
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginLeft: '25%'
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

export default ClientChooseRoomScreen;
