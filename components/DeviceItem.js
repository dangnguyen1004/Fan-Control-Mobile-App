import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import ToggleSwitch from 'toggle-switch-react-native'
import color from '../config/color';


function DeviceItem({ device, onToggle }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={{
                    fontSize: color.fontSize,
                }}>{device.name}</Text>
            </TouchableOpacity>
            <ToggleSwitch
                isOn={device.isOn}
                onColor="green"
                offColor="red"
                size="large"
                onToggle={onToggle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default DeviceItem;