import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import color from '../config/color';

function CancelButton({ style, onPress, title }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
<<<<<<< HEAD
            <Text style={styles.text}>{title}</Text>
=======
                <Text style={styles.text}>{title}</Text>
>>>>>>> Enhence-UI
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
<<<<<<< HEAD
        backgroundColor: color.light,
=======
        backgroundColor: color.white,
>>>>>>> Enhence-UI
        borderRadius: 10,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: color.primary
    },
    text: {
        fontSize: color.fontSize,
        color: color.primary,
    }
});

export default CancelButton;