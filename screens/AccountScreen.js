import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import AccountItem from '../components/AccountItem';
import AccountItemSeparator from '../components/AccountItemSeparator';
import Icon from '../components/Icon';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';
import firebase from '../firebase/connectFirebase'

const menuItems = [
    {
        title: "Adafruit Account",
        icon: {
            name: 'server',
            backGroundColor: color.primary,
        },
        route: 'AdaAccount',
    },
    {
        title: "Password",
        icon: {
            name: 'onepassword',
            backGroundColor: '#00C2BA',
        },
        route: 'Password',
    },
    {
        title: "Phone",
        icon: {
            name: 'cellphone',
            backGroundColor: '#652EC7',
        },
        route: 'Phone',
    },
]

function AccountScreen({ navigation }) {
    const [userEmail, setUserEmail] = useState()
    const [userName, setUserName] = useState()
    const [userId, setUserId] = useState()
    const [avatarUrl, setAvatarUrl] = useState()
    
    
    const getUserInfo = async () => {
        let user = await firebase.auth().currentUser
        setUserEmail(user.email)
        setUserId(user.uid)
        firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
            let data = snapshot.val()
            console.log(data)
            setUserName(data.name)
        })
        firebase.storage().ref().child('avatars/' + user.uid).getDownloadURL().then((url) => setAvatarUrl(url))
    }

    useEffect(() => {
        getUserInfo()
    }, [])


    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            console.log('sign out')
        }).catch((error) => {
            console.log(error.message)
        });
    }

    const createAlertLogOut = () => handleSignOut()
    // Alert.alert(
    //     "Log out",
    //     "You will be returned to the login screen",
    //     [
    //         {
    //             text: "Cancel",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel"
    //         },
    //         { text: "OK", onPress: handleSignOut }
    //     ],
    //     { cancelable: false }
    // );

    return (
        <ScreenApp style={{
            backgroundColor: color.light
        }}>
            <View style={styles.accountInfo}>
                <TouchableOpacity onPress={() => navigation.navigate('UploadAvatar')}>
                    <Image
                        source={avatarUrl ? { uri: avatarUrl } : require('../assets/avatarPlaceholder.jpg')}
                        style={styles.avatar}
                    ></Image>
                </TouchableOpacity>
                <View style={styles.infoDetail}>
                    <Text style={styles.email}>{userEmail}</Text>
                    <Text style={styles.name}>{userName}</Text>
                </View>
            </View>

            <View style={{
                marginBottom: 30,
            }}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={AccountItemSeparator}
                    renderItem={({ item }) =>
                        <AccountItem
                            title={item.title}
                            IconComponent={
                                <Icon name={item.icon.name} style={styles.icon} backgroundColor={item.icon.backGroundColor} />
                            }
                            onPress={() => navigation.navigate(item.route)}
                        ></AccountItem>
                    }
                ></FlatList>
            </View>

            <AccountItem
                IconComponent={
                    <Icon name='logout' size={40} style={styles.icon} backgroundColor={color.danger}></Icon>
                }
                title='Log out'
                onPress={createAlertLogOut}
            ></AccountItem>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
    },
    accountInfo: {
        width: '100%',
        backgroundColor: color.white,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    email: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    name: {
        fontSize: color.fontSize,
    }

});

export default AccountScreen;