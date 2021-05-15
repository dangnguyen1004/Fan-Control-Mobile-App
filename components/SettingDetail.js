import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../config/color'

function SettingDetail({detail, value}) {
    return (
        <View style={styles.container}>
            <Text style={styles.key}>{detail}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
    },
    key: {
        color: colors.third,
        fontSize: 24,
        fontWeight: '500',
    },
    value: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: '500',
    }

})

export default SettingDetail;