import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'

function AccountItem({ title, IconComponent, onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.outNerContainer, style]}>
                <View style={styles.container}>
                    {IconComponent}
                    <Text style={styles.title}>{title}</Text>
                </View>
                <MaterialCommunityIcons name='chevron-right' size={40}></MaterialCommunityIcons>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    outNerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: color.white,
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 10,
        fontSize: color.fontSize,
        fontWeight: 'bold',
    }
});

export default AccountItem;