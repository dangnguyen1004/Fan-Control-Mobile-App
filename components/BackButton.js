import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

function BackButton(props) {
    return (
        <Ionicons
            style={styles.backButton}
            name="arrow-back" size={40}
            color="white"
            onPress={() => console.log('back')}
        />
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
})

export default BackButton;