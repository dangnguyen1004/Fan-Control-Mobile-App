import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

function ScreenApp({ children, style }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 50,
    },
});

export default ScreenApp;