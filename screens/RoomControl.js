import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,FlatList,TouchableOpacity,Switch  } from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button,ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/images/logout.svg';
import { TextInput } from 'react-native';
import firebase from '@firebase/app';
import {getUserInformation} from '../requests/request';
import { render } from 'react-dom';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const _ = require('lodash');
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#C4C4C4",
          alignSelf: 'center'
        }}
      />
    );
  }
const FAN = [
    {key: '1' , Name: 'Quạt trái trên', State: 'On',Type: 'Fan'},
    {key: '2' , Name: 'Quạt trái giữa', State: 'Off',Type: 'Fan'},
    {key: '3' , Name: 'Quạt trái dưới', State: 'Off',Type: 'Fan'},
    {key: '4' , Name: 'Quạt trái trên', State: 'On',Type: 'Fan'},
    {key: '5' , Name: 'Quạt trái trên', State: 'On',Type: 'Fan'},
    {key: '6' , Name: 'Quạt trái trên', State: 'On',Type: 'Fan'},
    {key: '7' , Name: 'Quạt trái trên', State: 'Off',Type: 'Fan'},
]
const AIRCONDITIONER = [
    {key: '8' , Name: 'Máy lạnh trên', State: 'On',Type: 'Air-conditioner'},
    {key: '9' , Name: 'Máy lạnh giữa', State: 'Off',Type: 'Air-conditioner'},
    {key: '10' , Name: 'Máy lạnh dưới', State: 'Off',Type: 'Air-conditioner'},
]
export default function DeviceControl({navigation,route}) {
  const [fan,setDevices] = React.useState(FAN)
  const [airconditioner,setAir] = React.useState(AIRCONDITIONER)
  const [loading,setLoading] = React.useState(false)
  const [roomID,setRoom] = React.useState('')
  const [selectedIndex,updateIndex] = React.useState(0)
  const buttons = ['Fan', 'Air-conditioner']
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const handleAccountPress = () => {
    navigation.navigate('Account',route.params[1])
  }
  const handleControlPress = () => {
    navigation.navigate('ChooseRoom',route.params[1])
  }
  const Item = ({ item, onPress,index}) => (
    <View style={styles.Item}>
        <View style={styles.ItemWrap}>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
                  <Text style= {styles.ItemText}>{item.Name}</Text>
                 <View>
                 <SwitchToggle
                    switchOn={item.State == 'On' ? true : false}
                    onPress={() => handleTogglePress(item , index)}
                    circleColorOff='white'
                    circleColorOn='white'
                    backgroundColorOn='#42A5F0'
                    backgroundColorOff='#C4C4C4'
                    containerStyle={{
                        width: 40, height: 20, borderRadius: 25,padding: 3
                        
                      }}
                      circleStyle={{
                         width: 16, height: 16, borderRadius: 16
                      }}
                  />
                  </View>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);
  const renderItem = ({item, index}) => {
    return (
      <Item item={item} onPress={()=> handleDevicePress(item,index)} index ={index} />
    )
  }
  const handleIndex = (selectedIndex) => {
    updateIndex(selectedIndex)
  }
  const handleAddPress = () => {
    navigation.navigate('AddDevice',route.params)
  }
  const handleTogglePress = (item,index) => {
      const tempData = _.cloneDeep(selectedIndex == '0' ? fan : airconditioner);
      const result = (item.State == 'On' ? 'Off' : 'On');
      tempData[index].State = result ;
      selectedIndex == '0' ? setDevices(tempData) : setAir(tempData);
  }
  const handleDevicePress = (item, index) => {
    navigation.navigate('DeviceControl',[item,route.params[0],route.params[1]])
  }
  if (loading)
  {
    return (
    <Text>Loading</Text>
    )
  }
  else
  {
  return (
    <View style={styles.container}>
        <StatusBar   
          backgroundColor = "#102542"
          barStyle = "dark-content"   
        />
        <SafeAreaView style ={styles.wrap}>
        <View style={styles.header}>
            <Headline/>
        </View>
        <View  style={styles.body}>
          <View style={styles.usable}>
            <View style={styles.heading}>
                <Text style={styles.heading1}>
              <Text style={styles.account}>Control</Text>
              <Text style={{fontSize: 18, color: '#C4C4C4', fontFamily: textBold}}> Room 101-H1</Text>
              </Text>
            </View>
                <TouchableOpacity
                    style={styles.buttonAdd} onPress={handleAddPress}
                >
                    <Text style= {{fontSize: 18,color: '#2F81ED', fontFamily: textSemiBold }}>Add new device</Text>
                </TouchableOpacity>
                <ButtonGroup
                  onPress={handleIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={styles.indexStyle}
                  textStyle={{fontSize: 16, fontFamily: textBold}}
                />
            <SafeAreaView style={styles.container}>
               <FlatList
                  data={selectedIndex == '0' ? fan: airconditioner}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.key}

               />
            </SafeAreaView>
          </View>
        </View>
        </SafeAreaView>
          <View style={styles.navigation}>
          <Button
            title="ACCOUNT"
            titleStyle={{ fontSize: 20,color: '#908C8C', fontFamily: textBold}}
            containerStyle={styles.navigationButton}
            type="clear"
            onPress={handleAccountPress}
          />
          <Button
            title="CONTROL"
            titleStyle={{ fontSize: 20, fontFamily: textBold}}
            containerStyle={styles.navigationButton}
            type="clear"
            onPress={handleControlPress}
          />
        </View>
      </View>
  );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  wrap: {
    height: 0.95 * windowHeight,
    width: windowWidth
  },
  header: {
    width: windowWidth,
    height: 0.1 * windowHeight,
    backgroundColor: '#000',
  },
  body: {
    top: 0.05 * windowHeight,
    width: windowWidth,
    height: 0.85 * windowHeight,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 47,
    borderTopRightRadius: 47
  },
  usable: {
    top: 0.03 * windowHeight,
    height: 0.82*windowHeight,
    width: windowWidth,
  },
  heading: {
    flexDirection: 'row',
    
  },
  heading1: {
    marginLeft: 0.04 * windowWidth,
  },
  account: {
    fontSize: 30,
    color: '#2F81ED',
    fontFamily: textBold
  },
  exit: {
    alignSelf: 'center',
    paddingLeft: 0.5 * windowWidth
  },
  navigation: 
  {
    flexDirection: 'row',
    width: windowWidth,
    top: 0.9 * windowHeight,
    height: 0.1 * windowHeight,
    backgroundColor: '#fff',
    position: 'absolute'
  },
  navigationButton:
  {
    width: '50%'
  },
   input: {
    height: 40,
    margin: 12,
    paddingLeft: 0.05 * windowWidth,
    fontSize: 16,
    borderRadius: 26,
    borderWidth: 1
  },
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

  },
  buttonAdd: {
    height: 40,
    margin: 12,
    fontSize: 16,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2 // Android
  },
  SearchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
    margin: 12,
    paddingLeft: 0.05 * windowWidth,
   borderRadius: 26,
    backgroundColor: '#E5E5E5',
  },
  SearchBar: {
    flex: 1,
    fontSize: 18,
  },
  Icon: {
    marginRight: 12
  },
  Item: {
    backgroundColor: '#fff',
    flex: 1,
  },
  ItemWrap: {
    backgroundColor: '#fff',
    margin: 12
  },
  ItemTitle: {
  },
  ItemText: {
      fontSize: 16,
      fontFamily: textSemiBold,

  },
  indexStyle: {
    elevation: 1,
    borderRadius: 8,
    borderWidth: 0
  }
});