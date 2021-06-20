import React from 'react';
import {View,StyleSheet,Text,Image,Animated, TouchableOpacity } from 'react-native';
import StatusBar from '../components/statusBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Input,Button,Icon } from 'react-native-elements';
import {GradientButton} from '../components/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateDeviceLimit } from '../requests/request';
import CircularSlider from 'rn-circular-slider';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const GradientAttribute = {
    colors: ['#2F80ED', '#56CCF2'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
}
function Separator()  {
    return (
        <View style={styles.separator}/>
    )
}
function SeperatorVertical() {
    return (
        <View style={styles.verticalSeparator}/>
    )
}
export default function Limit({navigation, route}) {
    const [name,setName] = React.useState(route.params.name)
    const [tempValue,setTempValue] = React.useState((route.params.limit ? route.params.upTemp*2 : route.params.lowTemp*2))
    const [humidValue,setHumidValue] = React.useState((route.params.limit ? route.params.upHumid : route.params.lowHumid))
    const [isTemp,setTemp] = React.useState(true)
    const handleTempPress = () => {
        setTemp(true)
    }
    const handleHumidPress= () => {
        setTemp(false)
    }
    const handlePlusPress = () => {
        if (isTemp? (tempValue < 100) : (humidValue < 100))
        {
        isTemp? setTempValue(tempValue+1) : setHumidValue(humidValue+1)
        }
    }
    const handleMinusPress =() => {
        if (isTemp? (tempValue > 0) : (humidValue > 0))
        {
         isTemp? setTempValue(tempValue-1) : setHumidValue(humidValue-1)
        }
    }
    const handleConfirmPress = () => {
        (route.params.limit? updateDeviceLimit(route.params.id,tempValue/2,humidValue,route.params.lowTemp,route.params.lowHumid) : updateDeviceLimit(route.params.id,route.params.upTemp,route.params.upHumid,tempValue/2,humidValue))
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
                <Text style={styles.subHeaderText}>{route.params.limit ? 'Upper Limit' : 'Lower limit'}</Text>
            </View>
            <View style={styles.sliderHolder}>
                <Icon
                    name='minus' 
                    type='font-awesome-5' 
                    color='#908C8C'
                    size={30}
                    onPress={handleMinusPress}
                />
                <CircularSlider
                    step={1}
                    min={0}
                    max={100}
                    value={(isTemp? tempValue : humidValue)}
                    onChange={(value) => {isTemp? setTempValue(value) : setHumidValue(value)}}
                    contentContainerStyle={styles.contentContainerStyle}
                    strokeWidth={15}
                    buttonBorderColor="#3FE3EB"
                    buttonFillColor="#3FE3EB"
                    buttonStrokeWidth={15}
                    openingRadian={Math.PI / 4}
                    buttonRadius={10}
                    linearGradient={[{ stop: '0%', color: '#3FE3EB' }, { stop: '100%', color: '#7E84ED' }]}
                >
                    <Text style={{...styles.value, color: '#56CCF2'}}> {isTemp? `${tempValue/2}°C` : `${humidValue}%`}</Text>
                </CircularSlider>
                 <Icon
                    name='plus' 
                    type='font-awesome-5' 
                    color='#908C8C'
                    size={30}
                    solid={true}
                    onPress={handlePlusPress}
                />
			</View>
            <View style={styles.valueHolder}>
                <View style={styles.valueRow}>
                    <View style={styles.valueContent}>
                        <TouchableOpacity style={styles.touchableHolder} onPress={handleTempPress}>
                            <Text style={styles.valueText}>Temperature</Text>
                            <Text style={isTemp?  {...styles.value, color: '#56CCF2'}: styles.value}>{`${tempValue/2}°C`}</Text>
                        </TouchableOpacity>
                    </View>
                    <SeperatorVertical/>
                    <View style={styles.valueContent}>
                        <TouchableOpacity style={styles.touchableHolder} onPress={handleHumidPress}>
                            <Text style={styles.valueText}>Humidity</Text>
                            <Text style={!isTemp?  {...styles.value, color: '#56CCF2'}: styles.value}>{`${humidValue}%`}</Text>
                        </TouchableOpacity>
                    </View>     
                </View>
                <Separator/>
            </View>
           
            <GradientButton title="Confirm" onPress={handleConfirmPress}/>
        </View>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingTop: 50
    },
    headerText: {
        fontFamily:  textBold,
        fontSize: 42,
        marginLeft: 10
    },
    subHeaderText: {
        fontFamily: textSemiBold,
        fontSize: 16,
        marginLeft: 10,
        color: '#908C8C'
        
    },
    sliderHolder: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    valueHolder: {
        flex : 1,
    },
    valueRow: {
        flexDirection: 'row',
        width: '80%',
        height: '80%',
        alignSelf: 'center',
      
    },
    valueContent: {
        flex: 1,
        margin: 12,
        alignItems: 'center',
    },
    valueText: {
        fontFamily: textBold,
        fontSize: 18,
        color: '#908C8C'
    },
    value: {
        fontFamily: textMedium,
        fontSize: 36,
        marginVertical: 10,
        color: '#908C8C'
    },
     separator: {
        backgroundColor: '#06492C',
        opacity: 0.1,
        height: 2,
        width: '80%',
        alignSelf:'center'
    },
    verticalSeparator: {
        backgroundColor: '#06492C',
        opacity: 0.1,
        width: 2,
        height: '80%',
        alignSelf:'center'
    },
    confirmButton: {
    margin: 10,
    width : '50%',
    alignSelf : 'center',
    borderRadius: 26
    },
    confirmText: {
    fontFamily: textBold
     },
    contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
    touchableHolder: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});