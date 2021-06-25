import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import color from '../config/color';

function InputLabel({ label }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 15, color: '#3b3b3b'}}>{label}</Text>
            <View style={styles.line}></View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    line: {
        flex: 1,
        flexDirection: 'row',
        height: 1,
        backgroundColor: color.light,
        marginLeft: 10,
    }
});

export default InputLabel;