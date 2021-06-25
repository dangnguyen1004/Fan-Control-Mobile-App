import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import color from '../config/color';

function DeleteButton({ style, onPress, title, textColor = color.white }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: color.danger,
        borderRadius: 10,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: color.fontSize,
        color: color.white,
    }
});

export default DeleteButton;