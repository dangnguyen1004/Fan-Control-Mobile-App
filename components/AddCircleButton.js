import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import color from '../config/color';

function AddCircleButton({ onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={[styles.container, style]}>
                <MaterialCommunityIcons name='plus-circle' size={24} color={color.white} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default AddCircleButton;