import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import TextButton from '../components/TextButton';
import color from '../config/color';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
})

function LoginScreen({ navigation }) {

    const handleLogin = (values) => {
        console.log(values)
    }

    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={styles.logo}>FanControl</ScreenTitle>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                    <>
                        <InputField
                            style={styles.email}
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
                            style={styles.password}
                            placeholder="Password"
                            secureTextEntry={true}
                            textContentType='password' 
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                        ></InputField>
                        <ErrorMessage
                            title={errors.password}
                            visible={touched.password}
                        ></ErrorMessage>

                        <TextButton
                            style={styles.forgetPass}
                            title='Forget Password?'
                            onPress={() => console.log('Forget password')}
                        ></TextButton>
                        <AppButton
                            style={styles.login}
                            title='LOGIN'
                            onPress={handleSubmit}
                        ></AppButton>
                        <TextButton
                            style={styles.register}
                            title='Sign Up'
                            onPress={() => navigation.navigate('SignUp')}
                        ></TextButton>
                    </>
                )}
            </Formik>
        </ScreenApp >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: color.padding,
        paddingRight: color.padding,
        backgroundColor: color.white,
    },
    logo: {
        paddingBottom: 70,
    },
    email: {
        marginTop: 10,
    },
    password: {
        marginTop: 10,
    },
    login: {
        marginTop: 20,
        marginBottom: 10,
    },
    forgetPass: {
        marginTop: 30,
    }
});

export default LoginScreen;