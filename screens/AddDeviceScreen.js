import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import AppPicker from '../components/AppPicker';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';

function AddDeviceScreen(props) {
    const [deviceType, setDeviceType] = useState()

    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={styles.logo}>ADD NEW DEVICE</ScreenTitle>
            <AppPicker
                items={deviceTypes}
                selectedItem={deviceType}
                onSelectItem={item => setDeviceType(item)}
                placeholder='Choose type'
            ></AppPicker>
            <InputField
                placeholder='Device name'
            ></InputField>
            <InputField
                placeholder='Device feed'
            ></InputField>
            <AppButton
                style={styles.button}
                title='Add new device'
            ></AppButton>
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
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    }

});

export default AddDeviceScreen;

const deviceTypes = [
    {
        value: 1,
        label: 'Fan',
    },
    {
        value: 2,
        label: 'Air-Conditional',
    },
]
