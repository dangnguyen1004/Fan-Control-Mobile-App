import React from 'react';
import { Platform, StyleSheet, View,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,ScrollView,ActivityIndicator,TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StatusBar from '../components/statusBar';
import {Headline} from '../components/header';
import {HeaderText,SubHeaderText} from '../components/Text';
import { GrayButton,GradientButton } from '../components/button';
import { LoadingIndicator } from '../components/loadingIndicator';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/images/logout.svg';
import { TextInput } from 'react-native';
import firebase from '@firebase/app';
import {getUserInformation} from '../requests/request';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import font from '../config/font';
import color from '../config/color';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
export default function Account( {navigation,route}) {
  const [loading,setLoading] = React.useState(true)
  const [user,setUser] = React.useState({});
  React.useEffect(() => {
      const getData = async () => {
        setLoading(true)
        const userInfo = await getUserInformation();
        if(!userInfo.hasOwnProperty('fullName') || !userInfo.hasOwnProperty('phoneNumber') || !userInfo.hasOwnProperty('privacy'))
          {
            navigation.navigate('AccountProfile',{userID : userInfo.id})
          }
        else
        {
            setUser(userInfo);
            setLoading(false);
        }
      }
      getData();
  },[]);
  const handleOnRegisterPress = () => {
    navigation.navigate('RegisterRoom',user)
  }
  const handleLogoutPress = () => {
    firebase.auth().signOut().then(() => {
    }
    )
  }
  if (loading)
  {
    return (
         <LoadingIndicator visible={loading}/>
    )
  }
  else
  {
  return (
    <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
        <StatusBar/>
        <View style={styles.header}>
            <Headline/>
        </View>
        <View  style={styles.body}>
          <View style={styles.usable}>
          <View style={styles.heading}>
            <HeaderText value = 'Account'/>
            <View style={styles.exit}>
            <TouchableOpacity onPress={handleLogoutPress}>
            <Logout width={60} height={30}/>
            </TouchableOpacity>
            </View>
          </View>
          <SubHeaderText value= 'Name'/>
          <View style={styles.holder}>
              <InfoBox value={user.fullName} dropDown={false}/>
          </View>
          <SubHeaderText value= 'Phone'/>
          <View style={styles.holder}>
               <InfoBox value={user.phoneNumber} dropDown={false}/>
          </View>
          <SubHeaderText value= 'Privacy'/>
          <View style={styles.holder}>
            <InfoBox value={user.privacy} dropDown={false}/>
          </View>     
            <GrayButton
              title="Register room"
              onPress = {handleOnRegisterPress} 
            />
        </View>
        </View>
      </View>
     </TouchableWithoutFeedback>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    width: windowWidth,
    height: 0.1 * windowHeight,
    backgroundColor: '#fff',
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
  exit: {
    alignSelf: 'center',
    paddingLeft: 0.5 * windowWidth
  },
  holder: {
    alignSelf: 'center',
    paddingTop: 0.02 * windowHeight,
    width: 0.9 * windowWidth
  },
});