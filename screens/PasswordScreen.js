import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScreenApp from '../components/ScreenApp'
import ScreenTitle from '../components/ScreenTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../firebase/connectFirebase'
import { useState } from 'react';
import CancelButton from '../components/CancelButton'
import ErrorMessage from '../components/ErrorMessage';
import InputField from '../components/InputField';
import AppButton from '../components/AppButton';
import color from '../config/color';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required().min(6).label('Old password'),
    newPassword: Yup.string().required().min(6).label('New password'),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword'), null], 'Password must match').label('Confirmation'),
})



function PasswordScreen({ navigation }) {
    const [errorMessage, setErrorMessage] = useState()

    const handleChangePassword = (values) => {
        console.log(values)
    }

    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={{ marginBottom: 40, }}>Update password</ScreenTitle>
            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                onSubmit={handleChangePassword}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                    <>
                        <ErrorMessage
                            title={errorMessage}
                            visible={true}
                        ></ErrorMessage>
                        <InputField
                            placeholder='Old password'
                            onChangeText={handleChange('oldPassword')}
                            onBlur={() => setFieldTouched('oldPassword')}
                            secureTextEntry
                        ></InputField>
                        <ErrorMessage
                            title={errors.oldPassword}
                            visible={touched.oldPassword}
                        ></ErrorMessage>

                        <InputField
                            placeholder="New password"
                            secureTextEntry={true}
                            onChangeText={handleChange('newPassword')}
                            onBlur={() => setFieldTouched('newPassword')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.newPassword}
                            visible={touched.newPassword}
                        ></ErrorMessage>

                        <InputField
                            placeholder="Confirm password"
                            secureTextEntry={true}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={() => setFieldTouched('confirmPassword')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.confirmPassword}
                            visible={touched.confirmPassword}
                        ></ErrorMessage>

                        <AppButton
                            style={{
                                marginTop: 20,
                                marginBottom: 10,
                            }}
                            title='Update'
                            onPress={handleSubmit}
                        ></AppButton>
                        <CancelButton
                            title='Cancel'
                            onPress={() => navigation.goBack()}
                        ></CancelButton>
                    </>
                )}
            </Formik>
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
        marginBottom: 20,
    }
});

export default PasswordScreen;