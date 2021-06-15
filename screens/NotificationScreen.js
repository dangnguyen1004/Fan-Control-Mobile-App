import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import color from '../config/color';
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import { useEffect } from 'react';
import AccountItemSeparator from '../components/AccountItemSeparator';



function NotificationScreen({ navigation }) {
    const [notifications, setNotifications] = useState([])

    const getNotifications = async () => {
        let uid = await firebase.auth().currentUser.uid
        firebase.database().ref('users/' + uid).child('notifications').on('value', snapshot => {
            if (snapshot.val()) setNotifications(Object.values(snapshot.val()).reverse())
            else setNotifications([])
        })
    }

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color={color.black}></MaterialCommunityIcons>
                </TouchableOpacity>
                <Text style={styles.text}>Notification</Text>
            </View>
            <FlatList
                style={styles.listRooms}
                data={notifications}
                keyExtractor={item => item}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) =>
                    <View style={{ justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: color.fontSize }}>{item}</Text>
                    </View>}
            ></FlatList>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.white
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginRight: '35%',
    },
    listRooms: {
        width: '100%',
        marginTop: 20,
    },
});

export default NotificationScreen;