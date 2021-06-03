import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import { View, ActivityIndicator } from 'react-native';
export default class LoadingScreenSignIn extends Component {
    componentDidMount(){
        this.checkIfLoggedIn()
    }
    checkIfLoggedIn = () => {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.navigation.replace('ACCOUNT', {user})
            } else {
                this.props.navigation.replace("SIGN IN")
            }
        });
    };
    componentWillUnmount = () => {
        this.unsubscribe();
    }
    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                 <ActivityIndicator size="large"></ActivityIndicator>
            </View>
           
        );
    }
}