import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import color from '../config/color';

function InputField({placeholder, style, keyboardType, autoCompleteType = 'off', secureTextEntry=false, ...otherProps}) {
    return (
        <TextInput
            style = {[styles.container, style]}
            placeholder = {placeholder}
            placeholderTextColor={color.medium}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
<<<<<<< HEAD
=======
            autoCapitalize={'none'}
>>>>>>> Enhence-UI
            {...otherProps}
        ></TextInput>
    );
}   

const styles = StyleSheet.create({
    container: {
        width: '100%',
        color: color.medium,
        borderRadius: 10,
        fontSize: color.fontSize,
        height: 50,
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: color.light
    },
});

export default InputField;