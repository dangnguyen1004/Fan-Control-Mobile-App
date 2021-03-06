import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, DeviceEventEmitter } from 'react-native';
import AppButton from '../components/AppButton';
import AppPicker from '../components/AppPicker';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../firebase/connectFirebase'
import color from '../config/color';
import ErrorMessage from '../components/ErrorMessage';
import CancelButton from '../components/CancelButton';
import { useEffect } from 'react';
import moment from 'moment'


const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Device's name"),
    feed: Yup.string().required().label("Device's feed")
})

function AddDeviceScreen({ route, navigation }) {
    const { room } = route.params
    const [deviceType, setDeviceType] = useState()
    const [errorType, setErrorType] = useState()
    const [errorAdd, setErrorAdd] = useState()
    const [listFansName, setListFansName] = useState([])
    const [listAirConsName, setListAirConsName] = useState([])

    const getCurrentTime = () => {
        return moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss')
    }

    const handleAdd = (values) => {
        if (!deviceType) {
            setErrorType('Type is required')
            return
        }

        let listAllDevicesName = listFansName.concat(listAirConsName)
        if (listAllDevicesName.includes(values.name)) {
            setErrorAdd('Device already exists')
            return
        }

        // add to fans / airCons firebase
        if (deviceType.type === 'fan') {
            let newDevices = []
            if (room.listFans) newDevices = [...room.listFans, values.name]
            else newDevices = [values.name]

            firebase.database().ref('fans')
                .child(values.name).set({
                    id: values.name,
                    isOn: false,
                    type: 'fan',
                    feed: values.feed,
                })
            firebase.database().ref('rooms/' + room.name)
                .child('listFans').set(newDevices)
        } else {
            let newDevices = []
            if (room.listAirCon) newDevices = [...room.listAirCon, values.name]
            else newDevices = [values.name]

            firebase.database().ref('airCons')
                .child(values.name).set({
                    id: values.name,
                    isOn: false,
                    type: 'airCon',
                    feed: values.feed,
                })
            firebase.database().ref('rooms/' + room.name)
                .child('listAirCon').set(newDevices)
        }

        // write admin log
        firebase.database().ref('logs/' + color.adminUid).push({
            time: getCurrentTime(),
            log: 'You added device ' + values.name + ' to room ' + room.name + ' with feed ' + values.feed
        })

        navigation.navigate('ControlRoom')
    }

    const getAllDevicesName = async () => {
        firebase.database().ref()
            .child('fans').on('value', snapshot => {
                if (snapshot.val()) {
                    let temp = Object.keys(snapshot.val())
                    setListFansName(temp)
                }
            })
        firebase.database().ref()
            .child('airCons').on('value', snapshot => {
                if (snapshot.val()) {
                    let temp = Object.keys(snapshot.val())
                    setListAirConsName(temp)
                }
            })
    }

    useEffect(() => {
        getAllDevicesName()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={styles.logo}>ADD NEW DEVICE</ScreenTitle>
            <Formik
                initialValues={{ name: '', feed: '', }}
                onSubmit={handleAdd}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                    <>
                        <ErrorMessage
                            title={errorAdd}
                            visible={true}
                        ></ErrorMessage>

                        <AppPicker
                            items={deviceTypes}
                            selectedItem={deviceType}
                            onSelectItem={item => {
                                setDeviceType(item)
                                setErrorType(null)
                            }}
                            placeholder='Choose type'
                        ></AppPicker>
                        <ErrorMessage
                            title={errorType}
                            visible={true}
                        ></ErrorMessage>

                        <InputField
                            placeholder="Device's name"
                            onChangeText={handleChange('name')}
                            onBlur={() => setFieldTouched('name')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.name}
                            visible={touched.name}
                        ></ErrorMessage>

                        <InputField
                            placeholder="Device's feed"
                            onChangeText={handleChange('feed')}
                            onBlur={() => setFieldTouched('feed')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.feed}
                            visible={touched.feed}
                        ></ErrorMessage>

                        <AppButton
                            style={styles.button}
                            title='Add new device'
                            onPress={handleSubmit}
                        ></AppButton>
                        <CancelButton
                            title='Cancel'
                            onPress={() => navigation.navigate('ControlRoom')}
                        ></CancelButton>
                    </>
                )}
            </Formik>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.white,
    },
    logo: {
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
    }

});

export default AddDeviceScreen;

const deviceTypes = [
    {
        value: 1,
        label: 'Fan',
        type: 'fan'
    },
    {
        value: 2,
        label: 'Air-Conditional',
        type: 'airCon'
    },
]
