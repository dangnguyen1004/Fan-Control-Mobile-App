import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import AppButton from '../components/AppButton'

function AdaAccountScreen(props) {
    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Connect to Adafruit</Text>
            <InputField
                placeholder='Account'
            ></InputField>
            <InputField
                placeholder='Key'
            ></InputField>
            <AppButton 
                style={styles.button}
                title='CONNECT'
                onPress={() => console.log('connect to ada')}
            ></AppButton>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 120,
        marginBottom: 30,
    },
    button: {
        marginTop: 30,
    }
});

export default AdaAccountScreen;