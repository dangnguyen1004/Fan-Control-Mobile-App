import React from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Component } from 'react';
import firebase from 'firebase/app'
import logo from '../assets/logo.jpg'
import 'firebase/auth'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../config/color';
import AppButton from '../components/AppButton';
import TextButton from '../components/TextButton'

export default class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }
    onSignIn = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true })
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                if (response) {
                    this.props.navigation.replace('Loading Screen SignIn')
                    this.setState({ isLoading: false })
                }
            } catch (error) {
                this.setState({ isLoading: false })
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('A user with that email does not exist. Try signing');
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter an email address')
                        break;
                    default: alert('Password is incorrect')
                }
            }
        } else {
            alert('Please enter email or password')
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
                <View style={styles.form}>
                    <MaterialCommunityIcons name="hydraulic-oil-temperature" size={100} color="red" style={{ textAlign: 'center', marginTop: 80, }} />
                    <Text style={{ fontSize: 30, color: color.primary, textAlign: 'center', marginTop: '5%', fontWeight: 'bold', marginBottom: '10%' }}>CONTROL</Text>

                    <View style={styles.accountContainer}>
                        <MaterialIcons name="account-circle" size={25} color="grey" style={styles.logoAccount} />
                        <TextInput style={styles.account} placeholder='Email' autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={email => this.setState({ email })}
                        ></TextInput>
                    </View>

                    <View style={styles.accountContainer}>
                        <AntDesign style={styles.logoAccount} name="lock" size={25} color="grey" />
                        <TextInput style={styles.account} placeholder='Password' secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        ></TextInput>
                    </View>
                </View>

                <View style={styles.process}>
                    <AppButton title='SIGN IN' onPress={this.onSignIn}></AppButton>
                    <Text style={{ textAlign: 'center', marginBottom: '4%',marginTop: '10%',  }}>If you don't have an account</Text>
                    <TextButton title='Sign Up' onPress={() => this.props.navigation.navigate('SIGN UP')}></TextButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    form: {
        flex: 1,
        justifyContent: 'space-around',
        alignContent: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    process: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: color.light,
        width: '100%',
        marginBottom: 10,
    },
    account: {
        height: 30,
        flex: 1,
        marginLeft: 10,
        fontSize: color.fontSize,
    },
    logoAccount: {
    },
    logoPass: {
        position: 'absolute',
        top: '90%',
        left: 30
    }
});
