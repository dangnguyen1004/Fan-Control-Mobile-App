import React from 'react';
import {StyleSheet,View,Dimensions,TouchableOpacity, Image,Animated,ActivityIndicator } from 'react-native';
import { NormalButtonText,OnButtonText } from '../components/text';
import { InfoBoxGrid } from '../components/infoBoxGrid';
import { GradientButton } from '../components/button';
import StatusBar from '../components/statusBar';
import {Text,Button} from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { LoadingIndicator } from '../components/loadingIndicator';
import WavyHeader from '../components/wave';
import { getDevice } from '../requests/request';
import firebase from '@firebase/app';
import '@firebase/firestore';
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
    const fadeAnim= React.useRef(new Animated.Value(0)).current;
    const [loading,setLoading] = React.useState(true)
    const [device,setDevice] = React.useState()
    const [isOn,setOn] = React.useState('On')
    const handleNamePress = () => {
        navigation.navigate('DeviceName',device)
    }
    const handleUpLimitPress = () => {
        navigation.navigate('DeviceLimit',{...device, limit : 1})
    }
    const handleDownLimitPress = () => {
        navigation.navigate('DeviceLimit',{...device, limit : 0})
    }
    const handleTogglePress = () => {
        setOn(isOn == 'On' ? 'Off' : 'On');
    }
    const handleConfirmPress = () => {
        navigation.goBack()
    }
    React.useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data = await getDevice(route.params.deviceId)
            setDevice(data)
            setLoading(false)
        }
        getData()
    },[])
    React.useEffect(() => {
    const unsubscribe = firebase
    .firestore().collection('device').doc(route.params.deviceId)
    .onSnapshot(snapshot => {
        const device = snapshot.data()
        setDevice(device)
    })
    return () => {
    unsubscribe()
  }
    }, [])
    React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false
      }
    ).start();
  }, [fadeAnim])
    if (loading)
    {
         return (
            <LoadingIndicator visible={loading}/>
         )
    }
    else
    {
    return (
    <View style={styles.container}>
        <StatusBar />
        <View style={styles.header}>
             <WavyHeader customStyles={styles.svgCurve} />
                 <Image
                    style={styles.Image}
                    source={require('../assets/images/fan.png')}
                />
                  <TouchableOpacity style = {isOn == 'On'? styles.Button : {...styles.Button, ...styles.DisabledButton}}  onPress={() => handleTogglePress()}>
                <OnButtonText value={isOn == 'On' ? 'ON' : 'OFF'} />
            </TouchableOpacity>
            
        </View>
        <View style={styles.body}>
        <View style={styles.TextWrap}>
            <View style={styles.textHolder}>
                <View style={styles.holder}>
                    <Animated.View style={{...styles.animationHolder,opacity: fadeAnim}}>
                        <InfoBoxGrid onPress={handleNamePress} header="Name" source={require('../assets/images/icons8-room-64.png')} value={device.name} />
                    </Animated.View>
                </View>
                <View style={styles.holder}>
                    <Animated.View style={{...styles.animationHolder,opacity: fadeAnim}}>
                        <InfoBoxGrid onPress={handleNamePress} header="Mode" source={require('../assets/images/icons8-wrench-64.png')} value={device.mode? 'Auto' : 'Manual'}/>
                    </Animated.View>
                </View>
            </View>
              <View style={styles.textHolder}>
                <View style={styles.holder}>
                    <Animated.View style={{...styles.animationHolder,opacity: fadeAnim}}>
                        <InfoBoxGrid onPress={handleUpLimitPress} header="Turn on" source={require('../assets/images/icons8-chess-clock-64.png')} value= {`${device.upTemp}°C`} value2 = {`${device.upHumid}%`} />
                    </Animated.View>
                </View>
                <View style={styles.holder}>
                    <Animated.View style={{...styles.animationHolder,opacity: fadeAnim}}>
                        <InfoBoxGrid onPress={handleDownLimitPress} header="Turn off" source={require('../assets/images/icons8-chess-clock-64.png')} value= {`${device.lowTemp}°C`} value2 = {`${device.lowHumid}%`} />
                    </Animated.View>
                </View>
            </View>
        </View>
        <GradientButton title="Confirm" onPress= {handleConfirmPress}/>
        </View>
       
    </View>
    )
    }
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
        backgroundColor: '#5cdb5c',
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
        backgroundColor: '#ff0021'
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
  },
  animationHolder: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});