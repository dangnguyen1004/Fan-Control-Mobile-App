import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import AppButton from '../components/AppButton';
import CancelButton from '../components/CancelButton';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={require('../assets/welcomeBackground-01.png')}>
                <CancelButton
                    title='SIGN UP'
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                ></CancelButton>
                <AppButton
                    title='SIGN IN'
                    onPress={() => navigation.navigate('Login')}
                ></AppButton>
                <Text style={styles.description}>Improve your experience with our smart fan and air conditioning system solutions.</Text>
                <Text style={styles.logo}>SMART CONTROL</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column-reverse',
        alignItems: 'center',

    },
    button: {
        marginBottom: 50,
        marginTop: 10,
    },
    logo: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        color: color.primary,

    },
    description: {
        textAlign: 'center',
        fontSize: color.fontSizeLight,
        marginBottom: 40,
        marginTop: 5,
    }
});

export default WelcomeScreen;