import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import firebase from '../firebase/connectFirebase'
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../components/AppButton';
import color from '../config/color';
import { useState } from 'react';
import { useEffect } from 'react';
import CancelButton from '../components/CancelButton';

function UploadAvatarScreen({ navigation }) {
    const [user, setUser] = useState()
    const [url, setUrl] = useState()

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        let user = await firebase.auth().currentUser
        setUser(user)
    }

    const onChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync()

        if (!result.cancelled) upLoadImage(result.uri, user.uid)
            .then(() => {
                navigation.goBack()
            })
            .catch((error) => {
                Alert.alert(error)
            })
    }

    const upLoadImage = async (uri, imageName) => {
        const response = await fetch(uri)
        const blob = await response.blob()

        return firebase.storage().ref().child('avatars/' + imageName).put(blob)
    }


    return (
        <View style={styles.container}>
            <AppButton
                title='Upload your avatar'
                onPress={onChooseImage}
            ></AppButton>
            <CancelButton
                style={{marginTop: 10,}}
                title='Cancel'
                onPress={() => navigation.goBack()}
            ></CancelButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default UploadAvatarScreen;