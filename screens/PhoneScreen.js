import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ScreenApp from '../components/ScreenApp';
import ScreenTitle from '../components/ScreenTitle';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import color from '../config/color';


function PhoneScreen({ navigation }) {
    return (
        <ScreenApp style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color={color.black}></MaterialCommunityIcons>
                </TouchableOpacity>
                <Text style={styles.text}>Phone</Text>
            </View>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.white
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginRight: '30%',
    }
});

export default PhoneScreen;