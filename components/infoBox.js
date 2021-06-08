import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PanResponder } from 'react-native';
import { StyleSheet,View,Dimensions,TextInput,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text,Button} from 'react-native-elements';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export function InfoBox(props) {
     const initState = {
        value: [...props.value],
        dropdown: props.dropDown,
        onPress: props.onPress
    };
    const [state, setState] = React.useState(initState.value.join(""));
    React.useEffect(() => {
        setState([...props.value].join(""))
  });
  return (
    <TouchableOpacity
        style={styles.touch}
        onPress={initState.onPress}
    >
        <Text style= {{fontSize: 18, alignSelf: 'center'}}>{state}</Text>
        {initState.dropdown? <Icon name="chevron-down" size={18} style={{alignSelf: 'center',marginLeft: 'auto', paddingRight: 0.04 *windowWidth}}/>  : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    touch: {
    height: 40,
    margin: 12,
    paddingLeft: 0.05 * windowWidth,
    fontSize: 16,
    borderRadius: 26,
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2 // Android

  }
});
