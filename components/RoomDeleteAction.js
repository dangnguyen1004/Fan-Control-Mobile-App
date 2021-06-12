import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from '../config/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function RoomDeleteAction({ onPress }) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPress}>
                <MaterialCommunityIcons
                    name='trash-can'
                    size={25}
                    color={color.white}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.danger,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default RoomDeleteAction;