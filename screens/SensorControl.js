import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BlueBackground from '../components/BlueBackground';
import OnOffButton from '../components/OnOffButton'
import BackButton from '../components/BackButton';
import { Feather } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import colors from '../config/color'
import SettingDetail from '../components/SettingDetail';

function SensorControl(props) {
    return (
        <BlueBackground>
            <BackButton></BackButton>
            <Feather style={styles.icon} name="cpu" size={120} color="white" />
            <View style={styles.whiteBackground}></View>
            <View style={styles.OnOffButtonContainer}>
                <OnOffButton status='ON'></OnOffButton>
            </View>
            <View style={styles.humidityContainer}>
                <Text style={styles.humidity}>50%</Text>
                <Text style={styles.description}>Humidity sensor</Text>
            </View>
            <View style={styles.settings}>
                <SettingDetail detail='Sensor Id' value='S0515412'></SettingDetail>
                <SettingDetail detail='Room' value='805 - H1'></SettingDetail>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title='Delete sensor' onPress={() => console.log('delete')}></AppButton>
            </View>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    whiteBackground: {
        width: '100%',
        height: 800,
        position: 'absolute',
        top: 250,
        backgroundColor: 'white',
        elevation: 5,
    },
    OnOffButtonContainer: {
        position: 'absolute',
        top: 200,
        alignSelf: 'center',
    },
    icon: {
        position: 'absolute',
        top: 50,
        alignSelf: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
    },
    settings: {
        width: '100%',
        position: 'absolute',
        top: 500,
        padding: 20,
    },
    humidityContainer:{
        position: 'absolute',
        top: 360,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    humidity: {
        fontSize: 60,
    },
    description: {
        fontSize: 18,
    }
})

export default SensorControl;