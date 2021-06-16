import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import InputField from '../components/InputField';
import { useState } from 'react';
import AccountItemSeparator from '../components/AccountItemSeparator';
import { useEffect } from 'react';
import firebase from '../firebase/connectFirebase'


function ActivityLogScreen({ navigation }) {
    const [logs, setLogs] = useState([
        {
            time: '12h45  - 10/04/2021',
            log: '12h45, to hot so turn on fan room 102-H2'
        },
        {
            time: '12h45  - 04/11/2021',
            log: '12h45, to hot so turn on fan room 102-H2'
        },
        {
            time: '12h45  - 11/04/2021',
            log: '12h45, to hot so turn on fan room 102-H2'
        },
        {
            time: '12h45  - 09/04/2021',
            log: '12h45, to hot so turn on fan room 102-H2'
        },
        {
            time: '12h45  - 05/04/2021',
            log: '12h45, to hot so turn on fan room 102-H2'
        },
        {
            time: '12h45  - 10/09/2021',
            log: '12h45, to hot so turn on fan room 102-H2'
        },

    ])

    const getLogs = async () => {
        firebase.database().ref('logs/' + color.adminUid).on('value', snapshot => {
            if (snapshot.val()) setLogs(Object.values(snapshot.val()).reverse())
        })
    }

    const handleSearch = async (text) => {
        if (!text) {
            getLogs()
            return
        }
        let pattern = new RegExp(text, 'g');
        let searchResult = await logs.filter(item => item.time.toString().match(pattern) || item.log.toString().match(pattern))
        setLogs(searchResult)
    }

    useEffect(() => {
        getLogs()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Activity log</Text>
            <InputField
                style={{ marginBottom: 30, marginTop: 30, padding: 10, }}
                placeholder="Search"
                onChangeText={handleSearch}
            ></InputField>

            <FlatList
                style={styles.listRooms}
                data={logs}
                keyExtractor={item => item.time.toString()}
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
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.white,
        alignItems: 'center',
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
    },
    room: {
        marginTop: 10,
        marginBottom: 10,
    }
});

export default ActivityLogScreen;