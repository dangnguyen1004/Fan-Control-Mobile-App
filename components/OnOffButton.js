import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

function OnOffButton({status, style}) {
    return (
        <View style={[styles.buttonContainer, style]}>
            <View style={styles.buttonBackground}></View>
            <TouchableOpacity style={styles.button} onPress={() => console.log()}>
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
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    }
})

export default OnOffButton;