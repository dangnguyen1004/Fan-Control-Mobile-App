import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import AppButton from '../components/AppButton'
import ErrorMessage from '../components/ErrorMessage';
import color from '../config/color';
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import { useEffect } from 'react';
import CancelButton from '../components/CancelButton';
import InputLabel from '../components/InputLabel';
import AppPicker from '../components/AppPicker'

const validationSchema = Yup.object().shape({
    sensorFeed: Yup.string().required().label('Sensor feed'),
    fanFeed: Yup.string().required().label('Fan feed'),
    airConFeed: Yup.string().required().label('Air-conditioner feed'),
})

const deviceModes = [
    {
        label: 'Auto',
        value: 1,
    },
    {
        label: 'Manual',
        value: 2,
    }
]

function RoomFeedScreen({ navigation, route }) {
    const [room, setRoom] = useState()
    const { roomName } = route.params
    // const roomName = 'H1-101'
    const [sensorFeed, setSensorFeed] = useState()
    const [fanFeed, setFanFeed] = useState()
    const [airConFeed, setAirConFeed] = useState()
    const roomRef = firebase.database().ref('rooms/' + roomName)
    const [selectedMode, setSelectedMode] = useState()

    const handleFeedChange = (values) => {
        if (room.sensorFeed) {
            firebase.database().ref('feeds/' + room.sensorFeed)
                .child('feed').set(values.sensorFeed)
        } else {
            let newKey = firebase.database().ref('feeds').push({ feed: values.sensorFeed })
            roomRef.child('sensorFeed').set(newKey.key)
        }

        if (room.fanFeed) {
            firebase.database().ref('feeds/' + room.fanFeed)
                .child('feed').set(values.fanFeed)
        } else {
            let newKey = firebase.database().ref('feeds').push({ feed: values.fanFeed })
            roomRef.child('fanFeed').set(newKey.key)
        }


        if (room.airConFeed) {
            firebase.database().ref('feeds/' + room.airConFeed)
                .child('feed').set(values.airConFeed)
        } else {
            let newKey = firebase.database().ref('feeds').push({ feed: values.airConFeed })
            roomRef.child('airConFeed').set(newKey.key)
        }

        firebase.database().ref('rooms/' + room.name).child('mode').set(selectedMode.label)

        navigation.goBack()
    }

    const GetRoomInfo = () => {
        roomRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                setRoom(snapshot.val())

                if (snapshot.val().mode == 'Auto') setSelectedMode(deviceModes[0])
                else setSelectedMode(deviceModes[1])

                let sensorFeedId = snapshot.val().sensorFeed
                firebase.database().ref('feeds/' + sensorFeedId).on('value', snapshot => {
                    if (snapshot.val()) setSensorFeed(snapshot.val().feed)
                })

                let fanFeedId = snapshot.val().fanFeed
                firebase.database().ref('feeds/' + fanFeedId).on('value', snapshot => {
                    if (snapshot.val()) setFanFeed(snapshot.val().feed)
                })

                let airConFeedId = snapshot.val().airConFeed
                firebase.database().ref('feeds/' + airConFeedId).on('value', snapshot => {
                    if (snapshot.val()) setAirConFeed(snapshot.val().feed)
                })
            }
        })
    }

    useEffect(() => {
        GetRoomInfo()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <ScreenApp style={styles.container}>
                <ScreenTitle style={styles.logo}>Room setting</ScreenTitle>
                <Formik
                    initialValues={{ sensorFeed: '', fanFeed: '', airConFeed: '', }}
                    onSubmit={handleFeedChange}
                    validationSchema={validationSchema}
                >{({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                    <>
                        <InputLabel label='Room mode'></InputLabel>
                        <AppPicker
                            items={deviceModes}
                            selectedItem={selectedMode}
                            placeholder='Devices Mode'
                            onSelectItem={item => {
                                setSelectedMode(item)
                            }}
                        ></AppPicker>

                        <InputLabel label='Sensor feed'></InputLabel>
                        <InputField
                            placeholder='Sensor feed'
                            defaultValue={sensorFeed}
                            onChangeText={handleChange('sensorFeed')}
                            onBlur={() => setFieldTouched('sensorFeed')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.sensorFeed}
                            visible={touched.sensorFeed}
                        ></ErrorMessage>

                        <InputLabel label='Fan feed'></InputLabel>
                        <InputField
                            placeholder='Fan Feed'
                            defaultValue={fanFeed}
                            onChangeText={handleChange('fanFeed')}
                            onBlur={() => setFieldTouched('fanFeed')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.fanFeed}
                            visible={touched.fanFeed}
                        ></ErrorMessage>

                        <InputLabel label='Air-conditioner feed'></InputLabel>
                        <InputField
                            placeholder='Air-conditioner Feed'
                            defaultValue={airConFeed}
                            onChangeText={handleChange('airConFeed')}
                            onBlur={() => setFieldTouched('airConFeed')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.airConFeed}
                            visible={touched.airConFeed}
                        ></ErrorMessage>

                        <AppButton
                            style={styles.button}
                            title='UPDATE'
                            onPress={handleSubmit}
                        ></AppButton>
                        <CancelButton
                            title='Cancel'
                            onPress={() => navigation.goBack()}
                        ></CancelButton>
                    </>
                )}</Formik>
            </ScreenApp>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: color.white,
        paddingHorizontal: 10,
    },
    logo: {
        marginBottom: 30,
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
    },
    scrollView: {
        paddingVertical: 20,
    }
});

export default RoomFeedScreen;