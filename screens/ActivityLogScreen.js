import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import InputField from '../components/InputField';
import { useState } from 'react';
import AccountItemSeparator from '../components/AccountItemSeparator';
import { useEffect } from 'react';


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


    useEffect(() => {
    }, [])



    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Activity log</Text>
            <InputField
                style={{ marginBottom: 30, marginTop: 30, }}
                placeholder="Search"
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
    }
});

export default ActivityLogScreen;