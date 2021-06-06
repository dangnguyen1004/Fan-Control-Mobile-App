import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import AppButton from '../components/AppButton';
import AppPicker from '../components/AppPicker';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import color from '../config/color';

function AddRoomScreen(props) {
    const [selectedBuilding, setSelectedBuilding] = useState()
    const [selectedRoom, setSelectedRoom] = useState()

    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={styles.logo}>ADD NEW ROOM</ScreenTitle>
            <AppPicker
                items={buildings}
                selectedItem={selectedBuilding}
                placeholder='Choose building'
                onSelectItem={item => {
                    setSelectedBuilding(item)
                    console.log(selectedBuilding)
                }}
            ></AppPicker>
            <AppPicker
                items={rooms}
                selectedItem={selectedRoom}
                onSelectItem={item => setSelectedRoom(item)}
                placeholder='Choose room'
            ></AppPicker>
            <InputField
                placeholder='Sensors feed'
            ></InputField>
            <AppButton
                style={styles.button}
                title='ADD'
                onPress={() => console.log('add new room')}
            ></AppButton>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
    },
    logo: {
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    }
});

export default AddRoomScreen;

const buildings = [
    {
        label: "H1",
        value: 1,
    },
    {
        label: "H2",
        value: 2,
    },
    {
        label: "H3",
        value: 3,
    },
    {
        label: "H6",
        value: 4,
    },
];

const rooms = [
    {
        label: "101",
        value: "1",
    },
    {
        label: "102",
        value: 2,
    },
    {
        label: "103",
        value: 3,
    },
    {
        label: "104",
        value: 4,
    },
    {
        label: "105",
        value: 5,
    },
    {
        label: "106",
        value: 6,
    },
    {
        label: "107",
        value: 7,
    },
    {
        label: "108",
        value: 8,
    },
    {
        label: "109",
        value: 9,
    },
];