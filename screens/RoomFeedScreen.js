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
import moment from 'moment'

const validationSchema = Yup.object().shape({
    sensorFeed: Yup.string().label('Sensor feed'),
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
    const [sensorFeed, setSensorFeed] = useState()
    const roomRef = firebase.database().ref('rooms/' + roomName)
    const [selectedMode, setSelectedMode] = useState()
    const [thresholdTemp, setThresholdTemp] = useState()
    const [thresholdHumid, setThresholdHumid] = useState()

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const handleFeedChange = (values) => {
        if (room.sensorFeed) {
            firebase.database().ref('feeds/' + room.sensorFeed)
                .child('feed').set(values.sensorFeed)
        } else {
            let newKey = firebase.database().ref('feeds').push({ feed: values.sensorFeed })
            roomRef.child('sensorFeed').set(newKey.key)
        }

        firebase.database().ref('rooms/' + room.name).child('mode').set(selectedMode.label)
        firebase.database().ref('rooms/' + room.name).child('thresholdTemp').set(thresholdTemp.value)
        firebase.database().ref('rooms/' + room.name).child('thresholdHumid').set(thresholdHumid.value)

        // write admin log
        firebase.database().ref('logs/' + color.adminUid).push({
            time: getCurrentTime(),
            log: 'You updated settings of room ' + room.name,
        })

        navigation.goBack()
    }

    const GetRoomInfo = () => {
        roomRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                setRoom(snapshot.val())
                
                if (snapshot.val().sensorFeed) setSensorFeed(snapshot.val().sensorFeed)

                if (snapshot.val().mode == 'Auto') setSelectedMode(deviceModes[0])
                else setSelectedMode(deviceModes[1])

                if (snapshot.val().thresholdTemp) setThresholdTemp(listThresholdTemp[snapshot.val().thresholdTemp - 23])
                if (snapshot.val().thresholdHumid) setThresholdHumid(listThresholdHumid[Math.floor((snapshot.val().thresholdHumid - 40) / 5)])
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
                    initialValues={{ sensorFeed: '', }}
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

                        <>
                            <InputLabel label='Threshold Temperature'></InputLabel>
                            <AppPicker
                                items={listThresholdTemp}
                                selectedItem={thresholdTemp}
                                placeholder='Threshold Temperature'
                                onSelectItem={item => {
                                    setThresholdTemp(item)
                                }}
                            ></AppPicker>

                            <InputLabel label='Threshold Humidity'></InputLabel>
                            <AppPicker
                                items={listThresholdHumid}
                                selectedItem={thresholdHumid}
                                placeholder='Threshold Humidity'
                                onSelectItem={item => {
                                    setThresholdHumid(item)
                                }}
                            ></AppPicker>
                        </>

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
        paddingLeft: 10,
        paddingRight: 10,
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

const listThresholdTemp = [
    {
        value: 23,
        label: 23,
    },
    {
        value: 24,
        label: 24,
    },
    {
        value: 25,
        label: 25,
    },
    {
        value: 26,
        label: 26,
    },
    {
        value: 27,
        label: 27,
    },
    {
        value: 28,
        label: 28,
    },
    {
        value: 29,
        label: 29,
    },
    {
        value: 30,
        label: 30,
    },
    {
        value: 31,
        label: 31,
    },
    {
        value: 32,
        label: 32,
    },
    {
        value: 33,
        label: 33,
    },
    {
        value: 34,
        label: 34,
    },
    {
        value: 35,
        label: 35,
    },
    {
        value: 36,
        label: 36,
    },
    {
        value: 37,
        label: 37,
    },
    {
        value: 38,
        label: 38
    },
    {
        value: 39,
        label: 39,
    },
    {
        value: 40,
        label: 40,
    },
]

const listThresholdHumid = [
    {
        value: 40,
        label: 40,
    },
    {
        value: 45,
        label: 45,
    },
    {
        value: 50,
        label: 50,
    },
    {
        value: 55,
        label: 55,
    },
    {
        value: 60,
        label: 60,
    },
    {
        value: 65,
        label: 65,
    },
    {
        value: 70,
        label: 70,
    },
    {
        value: 75,
        label: 75,
    },
    {
        value: 80,
        label: 80,
    },
    {
        value: 85,
        label: 85,
    },
    {
        value: 90,
        label: 90,
    },
    {
        value: 95,
        label: 95,
    },
]