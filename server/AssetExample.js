import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, Button, Alert } from 'react-native';
//import Logo from '../assets/snack-icon.png';

import MqttClient from './mqtt-client';
import AppButton from '../components/AppButton'
import CancelButton from '../components/CancelButton';




export default function AssetExample() {

  return (
    <View style={styles.container}>
      <MqttClient />
      <Text style={styles.paragraph}>
        Local files and assets can be imported by dragging and dropping them into the editor
      </Text>
      <AppButton
        title='Hi there'
        onPress={() => Alert.alert('Hello World')}
      ></AppButton>
      <CancelButton onPress={() => Alert.alert("Styled Button")} title="Sheeesh" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 100,
    paddingVertical: 9,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }


});
