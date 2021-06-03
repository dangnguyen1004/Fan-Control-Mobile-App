import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

function BlueBackground({ children }) {
    return (
            <ImageBackground
                source={require('../assets/bluebackground.png')}
                style={styles.image}
            >{children}</ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
    }
})

export default BlueBackground;