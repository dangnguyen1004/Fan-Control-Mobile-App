import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import AccountItemSeparator from '../components/AccountItemSeparator';
import AppButton from '../components/AppButton';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import { } from '@expo/vector-icons';
import DeviceItem from '../components/DeviceItem';

function ControlRoomScreen({ route, navigation }) {
    const [currentRoom, setCurrentRoom] = useState('H1 - 105')
    const {roomSelected} = route.params
    setCurrentRoom(roomSelected)
    console.log(currentRoom)

    const handleAdd = () => {
        navigation.navigate('AddDevice')
    }
        

    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>{currentRoom}</Text>
            <AppButton
                style={styles.button}
                title='Add new device'
                onPress={handleAdd}
            ></AppButton>
            <View style={styles.temperature}>
                <Text style={{ fontSize: color.fontSize, color: color.danger, fontWeight: 'bold', }}>Temperature</Text>
                <Text style={{ fontSize: color.fontSize, color: color.danger, fontWeight: 'bold', }}>37oC</Text>
            </View>
            <View style={styles.temperature}>
                <Text style={{ fontSize: color.fontSize, color: color.primary, fontWeight: 'bold', }}>Humidity</Text>
                <Text style={{ fontSize: color.fontSize, color: color.primary, fontWeight: 'bold', }}>60%</Text>
            </View>
            <FlatList
                style={styles.listDevices}
                data={devices}
                keyExtractor={item => item.value.toString()}
                ItemSeparatorComponent={AccountItemSeparator}
                renderItem={({ item }) => (
                    <DeviceItem
                        device={item}
                        onToggle={() => console.log('toggle')}
                    ></DeviceItem>
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

    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30,
    },
    temperature: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
        height: 50,
    },
    button: {
        marginBottom: 20,
    },
    listDevices: {
        width: '100%',

    }
});

export default ControlRoomScreen;

const devices = [
    {
        value: 1,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 2,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 3,
        name: 'Fan 1',
        isOn: false,

    },
    {
        value: 4,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 5,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 6,
        name: 'Fan 1',
        isOn: false,
    },
    {
        value: 7,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 8,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 9,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 10,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 11,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 12,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 13,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 14,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 15,
        name: 'Fan 1',
        isOn: false,
    }, {
        value: 16,
        name: 'Fan 1',
        isOn: false,
    },
]