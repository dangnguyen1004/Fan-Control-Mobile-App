import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from '../config/color';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function RequestDenyAction({ onPress }) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPress}>
                <AntDesign name="close" size={25} color={color.white} />
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

export default RequestDenyAction;