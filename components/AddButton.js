import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import color from '../config/color';

function AddButton({ onPress, size = 25 }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Ionicons name="add-outline" size={size} color={color.white} />
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
        backgroundColor: color.primary
    },
});

export default AddButton;