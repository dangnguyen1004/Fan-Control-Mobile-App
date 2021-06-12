import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,FlatList,TouchableOpacity,SectionList  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button} from 'react-native-elements';
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
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const DATA = [
{
  title: 'H1',
  data: [
    {Name: 101 , key: '1',building: 'H1'},
  {Name: 102 , key: '2'},
  {Name: 103 , key: '3'},
  {Name: 104, key: '4'}
  ]
},
{
  title: 'H2',
  data: [
    {Name: 101 , key: '1'},
  {Name: 102 , key: '2'},
  {Name: 103 , key: '3'},
  {Name: 104, key: '4'},
  {Name: 105, key: '5'},
  {Name: 106, key: '6'}
  ]
}
]
const Item = ({ item, onPress}) => (
    <TouchableOpacity
        style={styles.touch}
        onPress={onPress}
    >
        <Text style= {{fontSize: 18, alignSelf: 'center', fontFamily: textMedium}}>Room {item.Name}</Text>
    </TouchableOpacity>
);
export default function ChooseRoom({navigation,route}) {
  const [loading,setLoading] = React.useState(false)
  const [roomID,setRoom] = React.useState('')
  const handleAccountPress = () => {
    navigation.navigate('Account',route.params)
  }
  const handleControlPress = () => {
    navigation.navigate('ChooseRoom',route.params)
  }
  const handleRoomPress = (item) => {
    navigation.navigate('RoomControl',[item,route.params])
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
              <Text style={styles.account}>Control</Text>
            </View>
            <Text style={styles.completeP} >Choose room</Text>
                <View style={styles.SearchContainer}>
                <TextInput
                  style={styles.SearchBar}
                  placeholder= 'Search'
                  underlineColorAndroid="transparent"
                />
                <Icon style={styles.Icon}
                        name='search'
                        size={18}
                        color = {'#908C8C'}
                    />
                </View>
            <SafeAreaView style={styles.container}>
              <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} onPress={()=> handleRoomPress(item)} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.title}>{title}</Text>
                )}
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
    width: windowWidth,
    color: '#C4C4C4',
    fontSize: 18,
    fontFamily: textBold
  },
  title: {
    left: 0.04 * windowWidth,
    color: '#908C8C',
    fontSize: 20,
    fontFamily: textSemiBold

  },
  holder: {
    alignSelf: 'center',
    paddingTop: 0.02 * windowHeight,
    width: 0.9 * windowWidth,
    flex: 1 
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
    backgroundColor: '#908C8C'
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
   completeP: {
    left: 0.04 * windowWidth,
    paddingBottom: 10,
    width: windowWidth,
    color: '#C4C4C4',
    fontSize: 18
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
  }
});