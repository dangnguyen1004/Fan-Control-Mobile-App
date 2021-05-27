import React, {useState} from 'react';
import {StyleSheet, View,Text, Button, Image  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function SignUp({navigation}) {
    return (
        <View style={styles.container}>
            <AntDesign name="addusergroup" size={150} color="#09C0FF" />
            <TextInput placeholder="Email" style={styles.input} autoCapitalize="none"></TextInput>
            <TextInput placeholder="user name" style={styles.input} autoCapitalize="none"></TextInput>
            <TextInput placeholder="Phone" style={styles.input} autoCapitalize="none"></TextInput>
            <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} autoCapitalize="none"></TextInput>
            <View style={styles.buttonContainer}>
                <Button title="Register"></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        paddingVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: "55%",

    },
    buttonContainer: {
        marginTop:20,
        width:'50%',
    },
});