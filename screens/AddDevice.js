import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback,Keyboard,SafeAreaView,FlatList,TextInput  } from 'react-native';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/logout.svg';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TypeList = [
  {type: 'Fan', key: '1'},
  {type: 'Air-conditioner', key: '2'}
]
const ModeList = [
  {type: 'Auto', key: '1'},
  {type: 'Manual', key: '2'}
]
 const Item = ({ item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={[styles.title]}>{item.type}</Text>
    </TouchableOpacity>
  );
export default function AddDevice({ navigation, route}) {
  const renderItem = ({ item  }) => {
    return (
      <Item
        item={item}
        onPress={() => {handleItemTypePress(item)}}
      />
    );
  };
  const renderItem1 = ({ item  }) => {
    return (
      <Item
        item={item}
        onPress={() => {setMode(item.type);setVisibleMode(!visibleMode)}}
      />
    );
  };
  const [type,setType] = React.useState('Fan')
  const [name,setName] = React.useState('')
  const [mode,setMode] = React.useState('Auto')
  const [visibleType,setVisibleType] = React.useState(false)
  const [visibleMode,setVisibleMode] = React.useState(false)
  const nameRef = React.useRef()
  const handleItemTypePress = (item) => {
    setType(item.type);
    setVisibleType(!visibleType);
    setTimeout(() => nameRef.current.focus(),0);
  }
  const handleTypePress = () => {
    setVisibleType(!visibleType)
  }
  const handleModePress = () => {
    setVisibleMode(!visibleMode)
  }
    return (
      <TouchableWithoutFeedback 
          onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar   
          backgroundColor = "#102542"
          barStyle = "dark-content"   
        />
        <View style={styles.header}>
          <Headline/>
        </View>
        <View  style={styles.body}>
          <View style={styles.usable}>
            
          <View style={styles.heading}>
            <Text style={styles.account}>Add</Text>
          </View>
          <Text style={styles.completeP} >Add new device</Text>
          <Text style={styles.title}>Type</Text>
          <View style={styles.holder}>
            <InfoBox value = {type} dropDown={true} onPress={handleTypePress}/>
          </View>
          <Text style={styles.title}>Name</Text>
          <View style={styles.holder}>
               <TextInput
                defaultValue = {name}
                onChangeText = {value => setName(value)}
                style={styles.input}
                placeholder = 'Name'
                ref={nameRef}
                onSubmitEditing={() => setVisibleMode(!visibleMode)}
              />
          </View>
          <Text style={styles.title}>Mode</Text>
          <View style={styles.holder}>
            <InfoBox value = {mode} dropDown={true} onPress={handleModePress}/>
          </View>
          <Button containerStyle = {styles.register}
            buttonStyle = {styles.button}
            title="Add"
        />
          <Overlay isVisible={visibleType} onBackdropPress={handleTypePress} >
            <SafeAreaView style={styles.container}>
              <FlatList
                data={TypeList}
                renderItem={renderItem}
                keyExtractor={item => item.key}
              />
            </SafeAreaView>
          </Overlay>
          <Overlay isVisible={visibleMode} onBackdropPress={handleModePress}>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={ModeList}
                renderItem={renderItem1}
                keyExtractor={item => item.key}
              />
            </SafeAreaView>
          </Overlay>

        </View>
        </View>
        <View style={styles.navigation}>
          <Button
            title="ACCOUNT"
            titleStyle={{color: '#908C8C', fontSize: 20}}
            containerStyle={styles.navigationButton}
            type="clear"
          />
          <Button
            title="CONTROL"
            titleStyle={{ fontSize: 20}}
            containerStyle={styles.navigationButton}
            type="clear"
          />
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    width: windowWidth,
    height: 0.1 * windowHeight,
    backgroundColor: '#000',
  },
  body: {
    top: 0.05 * windowHeight,
    width: windowWidth,
    height: 0.95 * windowHeight,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 47,
    borderTopRightRadius: 47
  },
  usable: {
    top: 0.03 * windowHeight,
    height: 0.92*windowHeight,
    width: windowWidth,
  },
  heading: {
    flexDirection: 'row'
  },
  account: {
    left: 0.04 * windowWidth,
    fontSize: 30,
    color: '#2F81ED'
  },
  exit: {
    alignSelf: 'center',
    paddingLeft: 0.5 * windowWidth
  },
  completeP: {
    left: 0.04 * windowWidth,
    paddingBottom: 20,
    width: windowWidth,
    color: '#C4C4C4',
    fontSize: 18
  },
  title: {
    left: 0.04 * windowWidth,
    color: '#908C8C',
    fontSize: 20,
    paddingTop: 0.0015 * windowHeight

  },
  holder: {
    alignSelf: 'center',
    paddingTop: 0.02 * windowHeight,
    width: 0.9 * windowWidth
  },
  register: 
  {
    width: 0.9 * windowWidth,
    alignSelf: 'center',
    paddingTop: 0.05 * windowHeight
  },
  button : 
  {
    borderRadius: 26,
    backgroundColor: '#2F81ED'
  },
  navigation: 
  {
    flexDirection: 'row',
    width: windowWidth,
    top: 0.9 * windowHeight,
    bottom: 0.005 * windowHeight,
    position: 'absolute'
  },
  navigationButton:
  {
    width: '50%'
  },
    item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
   input: {
     fontSize: 18,
    height: 40,
    margin: 12,
    paddingLeft: 0.05 * windowWidth,
    borderRadius: 26,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2 // Android
  }
});