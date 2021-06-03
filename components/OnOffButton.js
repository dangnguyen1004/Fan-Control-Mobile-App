import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../config/color'

function OnOffButton({status, style, onPress}) {
    return (
        <View style={[styles.buttonContainer, style]}>
            <View style={styles.buttonBackground}></View>
            <TouchableOpacity style={[styles.button, status === 'ON' ? styles.buttonON : styles.buttonOFF]} onPress={onPress}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 50,
                    }}
                >{status}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBackground: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 75,
    },
    button: {
        position: 'absolute',
        width: 120,
        height: 120,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
    buttonON: {
        backgroundColor: colors.primary,
        elevation: 5,
        shadowOffset: {width: 0, height: 0  },
        shadowRadius: 10,
    },
    buttonOFF: {
        backgroundColor: colors.black,
    }
})

export default OnOffButton;