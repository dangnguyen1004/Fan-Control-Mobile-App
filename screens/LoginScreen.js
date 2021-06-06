import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import TextButton from '../components/TextButton';
import color from '../config/color';

function LoginScreen({navigation}) {
    return (
        <ScreenApp style={styles.container}>
            <ScreenTitle style={styles.logo}>FanControl</ScreenTitle>
            <ErrorMessage
                title='Wrong password'
                visible={true}
            ></ErrorMessage>
            <InputField
                style={styles.email}
                placeholder='Email'
                keyboardType='email-address'
            ></InputField>
            <InputField
                style={styles.password}
                placeholder="Password"
                secureTextEntry={true}
            ></InputField>
            <TextButton
                style={styles.forgetPass}
                title='Forget Password?'
                onPress={() => console.log('Forget password')}
            ></TextButton>
            <AppButton
                style={styles.login}
                title='LOGIN'
                onPress={() => console.log('Login')}
            ></AppButton>
            <TextButton
                style={styles.register}
                title='Sign Up'
                onPress={() => navigation.navigate('SignUp')}
            ></TextButton>
        </ScreenApp>
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
        marginBottom: 40,
    },
    login: {
        marginTop: 20,
        marginBottom: 10,
    }
});

export default LoginScreen;