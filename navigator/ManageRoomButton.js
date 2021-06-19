import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';


function ManageRoomButton({ onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <FontAwesome name="building-o" size={30} color={color.white} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary,
        height: 80,
        width: 80,
        borderRadius: 40,
        bottom: 30,
        borderColor: color.white,
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ManageRoomButton;