import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,ScrollView  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/logout.svg';
import { TextInput } from 'react-native';
import firebase from '@firebase/app';
import {getUserInformation} from '../requests/request';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function Account( {navigation,route}) {
  const {userID} = route.params
  const [loading,setLoading] = React.useState(true)
  const [user,setUser] = React.useState({});
  React.useEffect(() => {
      const getData = async () => {
        const userInfo = await getUserInformation(userID);
        if(!userInfo.hasOwnProperty('fullName') || !userInfo.hasOwnProperty('phoneNumber') || !userInfo.hasOwnProperty('privacy'))
          {
            navigation.navigate('AccountProfile',{userID : userID})
          }
        else
          {
            setUser(userInfo);
            setLoading(false);
          }
      }
      getData();
  },[route]);
  const handleOnRegisterPress = () => {
    navigation.navigate('RegisterRoom',user)
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
    <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
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
            <Text style={styles.account}>Account</Text>
            <View style={styles.exit}>
            <Logout width={60} height={30}/>
            </View>
          </View>
          <Text style={styles.title}>Name</Text>
          <View style={styles.holder}>
              <InfoBox value={user.fullName} dropDown={false}/>
          </View>
          <Text style={styles.title}>Phone</Text>
          <View style={styles.holder}>
               <InfoBox value={user.phoneNumber} dropDown={false}/>
          </View>
          <Text style={styles.title}>Privacy</Text>
          <View style={styles.holder}>
            <InfoBox value={user.privacy} dropDown={false}/>
          </View>
          <Button containerStyle = {styles.register}
            buttonStyle = {styles.button}
            title="Register room"
            onPress = {handleOnRegisterPress}
        />
        </View>
        </View>
          <View style={styles.navigation}>
          <Button
            title="ACCOUNT"
            titleStyle={{ fontSize: 20}}
            containerStyle={styles.navigationButton}
            type="clear"
          />
          <Button
            title="CONTROL"
            titleStyle={{color: '#908C8C', fontSize: 20}}
            containerStyle={styles.navigationButton}
            type="clear"
          />
        </View>
      </View>
     </TouchableWithoutFeedback>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
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
    backgroundColor: '#908C8C'
  },
  navigation: 
  {
    flexDirection: 'row',
    width: windowWidth,
    top: 0.9 * windowHeight,
    height: 0.1 * windowHeight,
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
  }
});