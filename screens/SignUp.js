import React, { Component } from 'react';
import { StyleSheet, View, Button, ActivityIndicator, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../config/color';
import InputField from '../components/InputField'
import AppButton from '../components/AppButton';
import CancelButton from '../components/CancelButton';

export default class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            phone: '',
            isLoading: false
        }
    }
    onSignUp = async () => {
        if (this.state.email && this.state.password && this.state.phone && this.state.username) {
            this.setState({ isLoading: true })
            try {
                const response = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password);
                if (response) {
                    this.setState({ isLoading: false });
                    const user = await firebase
                        .database()
                        .ref('users/')
                        .child(response.user.uid).set({ email: response.user.email, uid: response.user.uid, phone: this.state.phone, username: this.state.username });

                    alert('Sign Up Success');
                    this.props.navigation.navigate('SIGN IN');

                }
            } catch (error) {
                this.setState({ isLoading: false })
                if (error.code == 'auth/email-already-in-use') {
                    alert('User already Exists. Try Loggin in');
                } else if (error.code == 'auth/invalid-email') {
                    alert('Please enter an email address')
                } else {
                    alert(error)
                }
            }
        } else {
            alert('you have not entered enough')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={[StyleSheet.absoluteFill, {
                        alignItems: 'center',
                        justifyContent: 'center', zIndex: 1000, elevation: 1000
                    }]}>
                        <ActivityIndicator size="large" />
                    </View>
                    : null}
                <Text style={styles.logo}>Sign Up</Text>
                <InputField
                    placeholder='Email'
                    autoCapitalize='none'
                    onChangeText={email => this.setState({ email })}
                ></InputField>
                <InputField
                    placeholder='Your Name'
                    onChangeText={username => this.setState({ username })}
                ></InputField>
                <InputField
                    placeholder='Phone'
                    onChangeText={phone => this.setState({ phone })}
                ></InputField>
                <InputField
                    placeholder='Password'
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry={true}
                ></InputField>

                <AppButton
                    title='SIGN UP'
                    onPress={this.onSignUp}
                ></AppButton>
                <CancelButton
                    title='SIGN IN'
                    onPress={() => this.props.navigation.navigate('SIGN IN')}
                ></CancelButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.white,
        paddingLeft: 10,
        paddingRight: 10,
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginTop: '30%',
        marginBottom: '10%',
        color: color.primary,
    }
});