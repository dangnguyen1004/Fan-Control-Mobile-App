import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,SectionList,TouchableOpacity,Switch, Image  } from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button, FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import WavyHeader from '../components/wave';
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
const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
}
export default function DeviceControl({navigation , route}) {
    // const [device,setDevice] = React.useState(route.params[0])
    // const [room,setRoom] = React.useState(route.params[1])
    const [deviceName,setdeviceName] = React.useState('Quạt giữa')
    const [upperLimit,setUpperLimit] = React.useState([30,40])
    const [lowerLimit,setLowerLimit] = React.useState([20,30])
    const [isOn,setOn] = React.useState('On')
    const handleTogglePress = () => {
        setOn(isOn == 'On' ? 'Off' : 'On');
    }
    const handleConfirmPress = () => {
        navigation.goBack()
    }
    return (
    <View style={styles.container}>
        <StatusBar   
            backgroundColor = "#102542"
            barStyle = "dark-content"   
        />
        <View style={styles.header}>
             <WavyHeader customStyles={styles.svgCurve} />
                 <Image
                    style={styles.Image}
                    source={require('../assets/images/fan.png')}
                />
                  <TouchableOpacity style = {isOn == 'On'? styles.Button : {...styles.Button, ...styles.DisabledButton}}  onPress={() => handleTogglePress()}>
                <Text style={styles.ButtonText}>{isOn == 'On' ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
            
        </View>
        <View style={styles.body}>
        <View style={styles.TextWrap}>
            <View style={styles.textHolder}>
                <View style={styles.holder}>
                    <View style={styles.contentHolder}>
                        <View style={styles.holderHeader}>
                            <Text style={styles.textHeader}>Name</Text>
                           <Image
                                style={styles.iconImage}
                                source={require('../assets/images/icons8-room-64.png')}
                            />
                        </View>
                        <View style={styles.holderValue}>
                            <Text style={styles.textContent}>Testing</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.holder}>
                    <View style={styles.contentHolder}>
                        <View style={styles.holderHeader}>
                            <Text style={styles.textHeader}>Mode</Text>
                           <Image
                                style={styles.iconImage}
                                source={require('../assets/images/icons8-wrench-64.png')}
                            />
                        </View>
                        <View style={styles.holderValue}>
                            <Text style={styles.textContent}>Auto</Text>
                        </View>
                    </View>
                </View>
            </View>
              <View style={styles.textHolder}>
                <View style={styles.holder}>
                    <View style={styles.contentHolder}>
                        <View style={styles.holderHeader}>
                            <Text style={styles.textHeader}>Turn on</Text>
                            <Image
                                style={styles.iconImage}
                                source={require('../assets/images/icons8-chess-clock-64.png')}
                            />
                        </View>
                        <View style={styles.holderValue}>
                            <Text style={styles.textContent}>30°C</Text>
                            <Text style={styles.textContent}>40%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.holder}>
                    <View style={styles.contentHolder}>
                        <View style={styles.holderHeader}>
                            <Text style={styles.textHeader}>Turn off</Text>
                            <Image
                                style={styles.iconImage}
                                source={require('../assets/images/icons8-chess-clock-64.png')}
                            />
                        </View>
                        <View style={styles.holderValue}>
                             <Text style={styles.textContent}>26°C</Text>
                            <Text style={styles.textContent}>50%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        <Button     containerStyle={styles.confirmButton}
                    ViewComponent={LinearGradient}
                    linearGradientProps = {GradientAttribute}
                    title="Confirm"
                    titleStyle={styles.confirmText}
                    onPress = {handleConfirmPress}
                />
        </View>
       
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    header: {
        flex: 3,
    },
    body: {
        flex: 7,
        
    },
    linearGradient: {
        flex: 1,
        alignItems: 'center',
    },
    Image: {
        width : 90, 
        height: 90,
        margin: 20,
        alignSelf: 'center',
    },
    Button: {
        top: 0,
        width: 80,
        height: 80,
        borderRadius: 80/2,
        backgroundColor: '#3287EE',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: '#2F81ED', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 8// Android
    }, 
    DisabledButton: {
        backgroundColor: '#000'
    },
    ButtonText: {
        fontSize: 30,
        color: '#fff',
        fontFamily: textBold
    },
    TextWrap: {
        paddingTop: 0,
        flex: 8,
    },
    TextHolder: {
        margin: 10,
        justifyContent:'space-between',
        flexDirection: 'row'
    },
    svgCurve: {
    position: 'absolute',
    width: windowWidth
  },
  textHolder: {
      flex: 1,
      flexDirection: 'row',
  },
  holderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  holder : {
      flex: 1,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  holderValue: {
  },
  contentHolder: {
      width: '80%',
      height: '60%',
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 10
  },
  textHeader: {
      color: '#1e88e5',
      fontSize: 16,
      fontFamily: textSemiBold,
      fontWeight: '400',
      margin: 5
  },
  iconHeader: {
      margin: 5
  },
  textContent: {
      fontSize: 18,
      fontFamily: textBold,
      paddingLeft: 5,
      color: '#005cb2'
  },
  confirmButton: {
    margin: 10,
    width : 0.5 * windowWidth,
    alignSelf : 'center',
    borderRadius: 26
  },
  confirmText: {
    fontFamily: textBold
  },
  iconImage: {
      height: 25,
      width: 25,
      margin: 5,

  }

});