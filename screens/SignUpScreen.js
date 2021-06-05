import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import InputField from '../components/InputField';
import ScreenApp from '../components/ScreenApp';
import TextButton from '../components/TextButton';
import color from '../config/color';

function SignUpScreen(props) {
    return (
        <ScreenApp style={styles.container}>
            <Text style={styles.logo}>Sign Up</Text>
            <ErrorMessage
                title='Email in valid'
                visible={true}
            ></ErrorMessage>
            <InputField
                placeholder='Email'
                keyboardType='email-address'
            ></InputField>
            <InputField
                placeholder='Name'
            ></InputField>
            <InputField
                placeholder='Password'
                secureTextEntry={true}
            ></InputField>
            <InputField
                placeholder='Retype Password'
                secureTextEntry={true}
            ></InputField>
            <AppButton
                style={styles.signup}
                title='SIGN UP'
                onPress={() => console.log('Sign up')}
            ></AppButton>
            <TextButton
                style={styles.login}
                title='Login'
                onPress={() => console.log('Login')}
            ></TextButton>
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
        fontSize: 40,
        fontWeight: 600,
        marginTop: 90,
        marginBottom: 30,
    },
    signup: {
        marginTop: 20,
        marginBottom: 10,
    }
});

export default SignUpScreen;