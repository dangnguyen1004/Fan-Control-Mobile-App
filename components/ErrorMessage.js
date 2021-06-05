import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import color from '../config/color';

function ErrorMessage({ title, visible = false, style }) {
    if (!visible) return null
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems:'center',
        justifyContent: 'center'
    },
    text: {
        color: color.danger,
        fontSize: color.fontSize,
    }
});

export default ErrorMessage;