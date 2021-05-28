import React from 'react';
import {StyleSheet, View,Text, Button, ActivityIndicator, Image  } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Component } from 'react';
import  firebase from 'firebase/app'
import logo from '../assets/logo.jpg'
import 'firebase/auth'
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        if(this.state.email && this.state.password) {
            this.setState({isLoading: true})
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                if (response) {
                    alert('Sign In Success')
                    this.props.navigation.replace('Loading Screen SignIn')
                    this.setState({isLoading: false})
                }
            }catch(error) {
                this.setState({isLoading: false})
                switch(error.code) {
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
    render (){
        return (
            <View style={styles.container}>
                {this.state.isLoading? 
                    <View style={[StyleSheet.absoluteFill, {alignItems:'center',
                    justifyContent:'center', zIndex:1000, elevation:1000}]}>
                        <ActivityIndicator size="large"/>
                    </View> 
                :null}
                <View style={styles.content}>
                    <View style={styles.form}>
                        <MaterialCommunityIcons name="hydraulic-oil-temperature" size={100} color="red" style={{textAlign:'center'}}/>
                        <Text style={{fontSize:30, color:'#09C0FF', textAlign:'center', marginTop:'10%'}}>CONTROL</Text>
                        <TextInput style={styles.account} placeholder='Email' autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText = {email => this.setState({email})}
                        ></TextInput>
                        <MaterialIcons name="account-circle" size={24} color="black"  style={styles.logoAccount}/>

                        <TextInput style={styles.account} placeholder='Password' secureTextEntry={true}
                            onChangeText = {password => this.setState({password})}
                        ></TextInput>
                        <AntDesign style={styles.logoPass} name="lock" size={24} color="black" />
                    </View>
                </View> 

                <View style={styles.process}>
                    <Button title="Sign In" onPress={this.onSignIn}></Button>
                    <View style={{marginTop:'10%'}}>
                        <Text style={{textAlign:'center', marginBottom:'10%'}}>If you don't have an account</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SIGN UP')} >
                            <Text style={{color:'blue',textAlign:'center', fontWeight:'bold'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    content: {
        flex:1.2,
    },
    form: {
        flex:1,
        justifyContent:'space-around',
        alignContent:'center',
        width: '70%',
        backgroundColor:'white',
        marginLeft:'15%'
    },
    process: {
        marginTop: '10%',
        flex:1,
        width: '70%',
        marginLeft:'15%'
    },
    account: {
        height:30, 
        width:'50%', 
        marginLeft:'25%', 
        marginTop:'10%',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    logoAccount:{
        position: 'absolute',
        top: '70%',
        left: 30
    },
    logoPass: {
        position: 'absolute',
        top: '90%',
        left: 30
    }
});
