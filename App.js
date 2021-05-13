import React, { Component } from 'react'
import {
  View, Text, StyleSheet

} from 'react-native'

export default class App extends Component {

  render() {
    return (
      <View style={css.view}>
        <Text>HELLO REACT NATIVE</Text>
      </View>
    );
  }
}
var css = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
