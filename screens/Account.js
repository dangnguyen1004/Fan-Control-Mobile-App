import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app'
import 'firebase/auth'
import AssetExample from '../server/AssetExample';
import color from '../config/color';
import AppButton from '../components/AppButton';

export default class ChooseRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentuser: {}
        }
    }
    signout = async () => {
        try {
            await firebase.auth().signOut()
            this.props.navigation.replace('SIGN IN')
        } catch (error) {
            alert('Unable to sign out')
        }
    }

    passDataToChooseRoom = () => {
        const user = this.props.route.params.user
        this.props.navigation.navigate('CHOOSE ROOM', { user })
    }

    componentWillMount = async () => {
        const user = this.props.route.params.user

        const userdata = await firebase
            .database()
            .ref('users')
            .child(user.uid)
            .once('value')

        this.setState({ currentuser: userdata.val() })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: color.fontSizeTitle, fontWeight: 'bold', color: color.primary }}>Account</Text>
                    <TouchableOpacity onPress={this.signout}>
                        <AntDesign name="logout" size={30} color="#2196F3" />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>

                    <Text style={{ color: color.black, fontSize: color.fontSize, }}>Name</Text>
                    <View style={styles.room}>
                        <Text style={styles.content}>{this.state.currentuser.username}</Text>
                    </View>

                    <Text style={{ color: color.black, marginTop: 10, fontSize: color.fontSize, }}>Phone</Text>
                    <View style={styles.room}>
                        <Text style={styles.content}>{this.state.currentuser.phone}</Text>
                    </View>

                    <Text style={{ color: color.black, marginTop: 10, fontSize: color.fontSize }}>Privacy</Text>
                    <View style={styles.room}>
                        <Text style={styles.content}>User</Text>
                    </View>

                    <AppButton
                        style={{
                            marginTop: 20,
                        }}
                        title='Control'
                        onPress={this.passDataToChooseRoom}
                    ></AppButton>

                    <AssetExample></AssetExample>
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
    },
    body: {
        marginTop: 30,
        backgroundColor: color.white,
        flex: 1,
    },
    room: {
        marginTop: 10,
        width: '100%',
        height: 50,
        backgroundColor: color.light,
        borderRadius: 50,
        elevation: 9,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    content: {
        fontSize: color.fontSize,
    },
});

