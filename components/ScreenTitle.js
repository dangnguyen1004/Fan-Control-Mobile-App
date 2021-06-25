import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import color from '../config/color';

function ScreenTitle({children, style}) {
    return (
        <Text style={[styles.container, style]} >{children}</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: color.fontSizeTitle,
        fontWeight: 'bold',
        marginTop: 50,
    },
});

export default ScreenTitle;