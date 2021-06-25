import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import color from '../config/color';

function DeviceButton({ onPress, state, style }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.first, style]}>
                <View style={[styles.second, state ? { backgroundColor: color.primary } : { backgroundColor: color.light }]}>
                    <View style={styles.third}>
                        <Text style={styles.text}>{state ? 'ON' : 'OFF'}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    first: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
        borderRadius: 60,

    },
    second: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        borderRadius: 50,
    },
    third: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
        borderRadius: 40,
    },
    text: {
        fontWeight: 'bold'
    }
});

export default DeviceButton;

