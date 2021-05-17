import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PanResponder } from 'react-native';
import { StyleSheet,View,Dimensions,TextInput,KeyboardAvoidingView} from 'react-native';
import {Text,Button} from 'react-native-elements';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export function InputBox(props) {
     const initState = {
        value: [props.value]
    };
    const [state, setState] = React.useState("567");
  return (
        <View  style={styles.container}>
         <TextInput
        style={styles.input}
        onChangeText={setState}
        value={state}
      />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
    },
    input: {
    height: 40,
    margin: 12,
    paddingLeft: 0.05 * windowWidth,
    fontSize: 16,
    borderRadius: 26,
    borderWidth: 1
  }
});
