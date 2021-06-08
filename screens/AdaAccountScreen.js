import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import AppButton from '../components/AppButton'
import color from '../config/color';
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../components/ErrorMessage';

const validationSchema = Yup.object().shape({
    account: Yup.string().required().label('Account'),
    key: Yup.string().required().min(32).max(32).label('Key'),
})

function AdaAccountScreen({ navigation }) {
    const handleConnect = (values) => {
        console.log('connect ada account')
        firebase.database().ref('adaAccount').set({
            account: values.account,
            key: values.key,
        });
        navigation.navigate('Account')
    }

    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Connect to Adafruit</Text>
            <Formik
                initialValues={{ account: '', key: '' }}
                onSubmit={handleConnect}
                validationSchema={validationSchema}
            >{({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                <>
                    <InputField
                        placeholder='Account'
                        onChangeText={handleChange('account')}
                        onBlur={() => setFieldTouched('account')}
                    ></InputField>
                    <ErrorMessage
                        title={errors.account}
                        visible={touched.account}
                    ></ErrorMessage>

                    <InputField
                        placeholder='Key'
                        onChangeText={handleChange('key')}
                        onBlur={() => setFieldTouched('key')}
                    ></InputField>
                    <ErrorMessage
                        title={errors.key}
                        visible={touched.key}
                    ></ErrorMessage>

                    <AppButton
                        style={styles.button}
                        title='CONNECT'
                        onPress={handleSubmit}
                    ></AppButton>
                </>
            )}</Formik>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        backgroundColor: color.white
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