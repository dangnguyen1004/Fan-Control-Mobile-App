import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import color from '../config/color';

function ViewLogButton({ onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <FontAwesome5 name="history" size={24} color={color.white} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary,
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default ViewLogButton;