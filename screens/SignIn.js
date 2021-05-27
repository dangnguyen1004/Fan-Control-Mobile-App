import React from 'react';
import {StyleSheet, View,Text, Button  } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Component } from 'react';

export default class SignIn extends Component {
    render (){
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <Text style={{fontSize:30, color:'#09C0FF', textAlign:'center', marginTop:'10%'}}>CONTROL</Text>
                        <TextInput style={styles.account} placeholder='Account'></TextInput>
                        <MaterialIcons name="account-circle" size={24} color="black"  style={styles.logoAccount}/>

                        <TextInput style={styles.account} placeholder='Password' secureTextEntry={true}></TextInput>
                        <AntDesign style={styles.logoPass} name="lock" size={24} color="black" />
                    </View>
                </View> 

                <View style={styles.process}>
                    <Button title="Sign In" onPress={() => this.props.navigation.replace('ACCOUNT')}></Button>
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
        flex:1,
        justifyContent:'center',
        alignContent:'center'

    },
    form: {
        flex:1,
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
        top: 97,
        left: 30
    },
    logoPass: {
        position: 'absolute',
        top: 152,
        left: 30
    }
});
