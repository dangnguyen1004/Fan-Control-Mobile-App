import React from 'react';
import { Platform, StyleSheet, View,Dimensions,KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback,Keyboard,SafeAreaView,FlatList,TextInput,ActivityIndicator  } from 'react-native';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import StatusBar from '../components/statusBar';
import {Text,Input,Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/images/logout.svg';
import {addDevice} from '../requests/request';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }
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
  const handleAddPress = async () => {
    if (name.length == 0 )
    {

      alert('Name can\'t be empty')
    }
    if (name.length > 24)
    {
      alert('Name can\'t be longer than 24 characters')
    }
    else
    {
      await addDevice(route.params.roomId,route.params.userId,name,type,mode)
      navigation.goBack()
    }
  }
    return (
      <TouchableWithoutFeedback 
          onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar/>
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
            ViewComponent={LinearGradient}
            linearGradientProps = {GradientAttribute}
            onPress={handleAddPress}
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
    color: '#2F81ED',
    fontFamily: textBold
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
    fontSize: 18,
    fontFamily: textSemiBold
  },
  title: {
    left: 0.04 * windowWidth,
    color: '#908C8C',
    fontSize: 20,
    fontFamily: textSemiBold,
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
    elevation: 2,
    backgroundColor:'white' // Android
  }
});