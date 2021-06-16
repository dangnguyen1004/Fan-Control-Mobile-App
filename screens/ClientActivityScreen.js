import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react';
import { useEffect } from 'react';
import AccountItemSeparator from '../components/AccountItemSeparator';
import firebase from '../firebase/connectFirebase';


function ClientActivityScreen({ navigation }) {
    const [logs, setLogs] = useState([])

    const getActivityLogs = async () => {
        let user = await firebase.auth().currentUser
        firebase.database().ref('logs/' + user.uid).on('value', snapshot => {
            if (snapshot.val()) setLogs(Object.values(snapshot.val()).reverse())
        })
    }

    useEffect(() => {
        getActivityLogs()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color={color.black}></MaterialCommunityIcons>
                </TouchableOpacity>
                <Text style={styles.logo}>Recent Activity</Text>
            </View>

            <FlatList
                style={styles.listRooms}
                data={logs}
                keyExtractor={item => item.time + item.log}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) => (
                        <View style={styles.room}>
                            <Text style={{ fontSize: 15 }}>{item.time.toString()}</Text>
                            <Text style={{ fontSize: color.fontSize }}>{item.log.toString()}</Text>
                        </View>
                )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginRight: '25%',
    },
    room: {
        marginTop: 10,
        marginBottom: 10,
    }
});

export default ClientActivityScreen;