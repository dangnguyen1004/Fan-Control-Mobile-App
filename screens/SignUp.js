import React, {Component} from 'react';
import {StyleSheet, View, Button , ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import  firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            phone:'',
            isLoading: false
        }
    }
    onSignUp = async () => {
        if(this.state.email && this.state.password && this.state.phone && this.state.username) {
            this.setState({isLoading: true})
            try {
                const response = await firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password);
                if(response) {   
                    this.setState({isLoading: false});
                    const user = await firebase
                    .database()
                    .ref('users/')
                    .child(response.user.uid).set({email:response.user.email, uid:response.user.uid, phone:this.state.phone, username:this.state.username});
                    
                    alert('Sign Up Success');
                    this.props.navigation.navigate('SIGN IN');
                 
                }
            } catch (error) {
                this.setState({isLoading: false})
                if(error.code == 'auth/email-already-in-use') {
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
    render (){
        return (
            <View style={styles.container}>
                {this.state.isLoading? 
                    <View style={[StyleSheet.absoluteFill, {alignItems:'center',
                    justifyContent:'center', zIndex:1000, elevation:1000}]}>
                        <ActivityIndicator size="large"/>
                    </View> 
                :null}
                <MaterialCommunityIcons name="hydraulic-oil-temperature" size={100} color="red" style={{textAlign:'center'}}/>

                <TextInput 
                    placeholder="Email" style={styles.input} autoCapitalize="none" 
                    onChangeText = {email => this.setState({email})} >
                </TextInput>

                <TextInput 
                    placeholder="user name" style={styles.input} 
                    onChangeText = {username => this.setState({username})} 
                ></TextInput>

                <TextInput 
                    placeholder="Phone" style={styles.input} 
                    onChangeText = {phone => this.setState({phone})} 
                ></TextInput>

                <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} 
                    onChangeText = {password => this.setState({password})} 
                ></TextInput>
                
                <View style={styles.buttonContainer}>
                    <Button title="Register" onPress={this.onSignUp}></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
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