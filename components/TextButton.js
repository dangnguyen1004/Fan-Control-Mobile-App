import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import color from '../config/color';

function TextButton({ onPress, title, style }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.text, style]} >{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: color.fontSize,
        textDecorationLine: 'underline',
        textDecorationColor: color.medium
    },
});

export default TextButton;