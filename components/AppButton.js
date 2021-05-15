import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import colors from '../config/color'

function AppButton({title, onPress, style}) {
    return (
        <TouchableHighlight style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    title: {
        fontSize: 15,
        color: colors.white,
    }
})

export default AppButton;