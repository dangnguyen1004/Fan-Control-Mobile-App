import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import AppButton from '../components/AppButton';
import AppPicker from '../components/AppPicker';
import CancelButton from '../components/CancelButton';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import color from '../config/color';
import * as Yup from 'yup';
import firebase from '../firebase/connectFirebase'
import { Formik } from 'formik';
import ErrorMessage from '../components/ErrorMessage';
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
    sensor: Yup.string().label('Sensor'),
})

function AddRoomScreen({ navigation }) {
    const [selectedBuilding, setSelectedBuilding] = useState()
    const [selectedRoom, setSelectedRoom] = useState()
    const [errorBuilding, setErrorBuilding] = useState()
    const [errorRoom, setErrorRoom] = useState()
    const [allRoomsName, setAllRoomsName] = useState([])
    const [errorAdd, setErrorAdd] = useState()
    const [errorSensor, setErrorSensor] = useState()

    const handleAdd = (values) => {
        if (!selectedBuilding) {
            setErrorBuilding('Building is required')
            return
        }

        if (!selectedRoom) {
            setErrorRoom('Room is required')
            return
        }

        if (!values.sensor) {
            setErrorSensor('Sensor is required')
            return
        }
        setErrorSensor(null)

        let newRoomName = selectedBuilding.label + '-' + selectedRoom.label
        if (allRoomsName.includes(newRoomName)) {
            setErrorAdd('Room already exists')
            return
        }

        let newFeed = firebase.database().ref('feeds').push({ feed: values.sensor })
        firebase.database().ref('rooms')
            .child(newRoomName).set({
                sensorFeed: newFeed.key,
                humidity: 30,
                temperature: 30,
                name: newRoomName,
            }).then(() => {
                alert
            })

        navigation.goBack()
    }

    const getAllRoomsName = () => {
        firebase.database().ref('rooms').on('value', snapshot => {
            if (snapshot.val()) {
                setAllRoomsName(Object.keys(snapshot.val()))
            }
        })
    }

    useEffect(() => {
        getAllRoomsName()
    }, [])

    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={styles.logo}>ADD NEW ROOM</ScreenTitle>
            <ErrorMessage
                title={errorAdd}
                visible={true}
            ></ErrorMessage>
            <AppPicker
                items={buildings}
                selectedItem={selectedBuilding}
                placeholder='Choose building'
                onSelectItem={item => {
                    setSelectedBuilding(item)
                    setErrorBuilding(null)
                }}
            ></AppPicker>
            <ErrorMessage
                title={errorBuilding}
                visible={true}
            ></ErrorMessage>

            <AppPicker
                items={rooms}
                selectedItem={selectedRoom}
                onSelectItem={item => {
                    setSelectedRoom(item)
                    setErrorRoom(null)
                }}
                placeholder='Choose room'
            ></AppPicker>
            <ErrorMessage
                title={errorRoom}
                visible={true}
            ></ErrorMessage>

            <Formik
                initialValues={{ sensor: '', }}
                onSubmit={handleAdd}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                    <>
                        <InputField
                            placeholder='Sensors feed'
                            onChangeText={handleChange('sensor')}
                            onBlur={() => setFieldTouched('sensor')}
                        ></InputField>
                        <ErrorMessage
                            title={errorSensor}
                            visible={touched.sensor}
                        ></ErrorMessage>
                        <AppButton
                            style={styles.button}
                            title='ADD'
                            onPress={handleSubmit}
                        ></AppButton>
                    </>
                )}
            </Formik>

            <CancelButton
                title="Cancel"
                onPress={() => navigation.goBack()}
            ></CancelButton>
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
        marginBottom: 10,
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
    {
        label: "110",
        value: 10,
    },
    {
        label: "111",
        value: 11,
    },
    {
        label: "112",
        value: 12,
    },

];