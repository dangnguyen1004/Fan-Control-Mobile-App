import React from 'react';
import {Text,StyleSheet,TextInput,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';

function SearchBar(props) {
    return (
        <View style={styles.SearchContainer}>
            <TextInput
                    style={styles.SearchBar}
                    placeholder= 'Search'
                    onChangeText={props.onChangeText}
                    underlineColorAndroid="transparent"
                    />
            <Icon style={styles.Icon}
                    name='search'
                    size={18}
                    color = {'#908C8C'}
                />
        </View>
    )
}

const styles= StyleSheet.create({
     SearchBar: {
    flex: 1,
    fontSize: 18,
  },
    container: {
        flex: 1
    },
    Icon: {
    marginRight: 12
  },
   SearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    margin: 12,
    paddingLeft: size.padding,
    borderRadius: size.buttonRadius,
    backgroundColor: '#E5E5E5',
  },
})

export {SearchBar}