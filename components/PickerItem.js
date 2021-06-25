import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import color from '../config/color';

function PickerItem({ label, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 20,
        fontSize: color.fontSize,
    }
})

export default PickerItem;