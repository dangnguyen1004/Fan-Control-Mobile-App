import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import TextButton from '../components/TextButton';
import color from '../config/color';
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    name: Yup.string().required(),
    password: Yup.string().required().min(6).label('Password'),
    passwordConfirmation: Yup.string().required().oneOf([Yup.ref('password'), null], 'Password must match').label('Confirmation'),
})

function SignUpScreen({ navigation }) {
    const handleSignUp = (values) => {
        console.log(values)
    }

    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={styles.logo}>Sign Up</ScreenTitle>
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    password: '',
                    passwordConfirmation: '',
                }}
                onSubmit={handleSignUp}
                validationSchema={validationSchema}
            >{({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                <>
                    <InputField
                        placeholder='Email'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                    ></InputField>
                    <ErrorMessage
                        title={errors.email}
                        visible={touched.email}
                    ></ErrorMessage>

                    <InputField
                        placeholder='Name'
                        textContentType='name'
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                    ></InputField>
                    <ErrorMessage
                        title={errors.name}
                        visible={touched.name}
                    ></ErrorMessage>

                    <InputField
                        placeholder='Password'
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                    ></InputField>
                    <ErrorMessage
                        title={errors.password}
                        visible={touched.password}
                    ></ErrorMessage>

                    <InputField
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={handleChange('passwordConfirmation')}
                        onBlur={() => setFieldTouched('passwordConfirmation')}
                    ></InputField>
                    <ErrorMessage
                        title={errors.passwordConfirmation}
                        visible={touched.passwordConfirmation}
                    ></ErrorMessage>

                    <AppButton
                        style={styles.signup}
                        title='SIGN UP'
                        onPress={handleSubmit}
                    ></AppButton>
                    <TextButton
                        style={styles.login}
                        title='Login'
                        onPress={() => navigation.navigate('Login')}
                    ></TextButton>
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
        backgroundColor: color.white,
    },
    logo: {
        marginBottom: 30,
    },
    signup: {
        marginTop: 20,
        marginBottom: 10,
    }
});

export default SignUpScreen;