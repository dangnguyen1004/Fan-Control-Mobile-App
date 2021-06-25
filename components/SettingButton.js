import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import color from '../config/color';

function SettingButton({ onPress, size = 25 }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Ionicons name="settings" size={size} color={color.primary} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        padding: 2,
        borderRadius: 10,
        borderColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
});

export default SettingButton;