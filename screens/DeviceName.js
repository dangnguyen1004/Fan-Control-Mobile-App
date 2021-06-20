import React from 'react';
import {View,StyleSheet,Text,Image,SafeAreaView } from 'react-native';
import StatusBar from '../components/statusBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Input,Button,Icon } from 'react-native-elements';
import {TextSeparator} from '../components/separator';
import {GradientButton} from '../components/button';
import {updateDeviceNM} from '../requests/request';
import Carousel from 'react-native-snap-carousel';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';
const entries = [
    {title: "Item 1", text: "Auto" },
    {title: "Item 2" ,text: 'Manual'}
]
export default function DeviceName({navigation, route}) {
    const [device,setDevice]  = React.useState(route.params)
    const [name,setName]  = React.useState(route.params.name)
    const [mode,setMode]  =React.useState(route.params.mode)
    var _carousel = React.useRef(null)
    const handleNextPress = () => {
         _carousel.snapToNext();
    }
    const handleBackPress =() => {
        _carousel.snapToPrev();
    }
    const handleConfirmPress = async () => {
        await updateDeviceNM(device.id,name,mode)
        navigation.goBack()
    }
    const  _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                {index == 1 ? 
                 <Icon
                    name='chevron-left' 
                    type='font-awesome-5' 
                    color='#3AA6E5'
                    size={20}
                    onPress= {handleBackPress}
                /> : null}
                <Text style={styles.title}>{ item.text }</Text>
                {index == 0 ? 
                    <Icon
                        name='chevron-right' 
                        type='font-awesome-5' 
                        color='#3AA6E5'
                        size={20}
                        onPress={handleNextPress}
                    /> : null}
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar/>
            <Image
                style={styles.image}
                source={require('../assets/images/classroom.jpg')}/>
            <View style={{opacity: 0, flex:5,width: '100%'}}>
            </View>
            <View style={styles.viewHolder}>
                <View style={styles.contentHolder}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Device</Text>
                    </View>
                    <View style={styles.body}>
                        <TextSeparator/>
                        <Text style={styles.bodyText}>Change name</Text>
                        <TextSeparator/>
                        <Input
                            containerStyle={styles.input}
                            placeholder={'Enter name'}
                            value={name}
                            onChangeText={setName}
                        />
                        <View style={styles.modeHolder}>
                            <Text style={styles.bodyText}>Mode</Text>
                            <SafeAreaView>
                                <Carousel
                                    data={entries}
                                    renderItem={_renderItem}
                                    sliderWidth={100}
                                    itemWidth={100}
                                    contentContainerCustomStyle={{alignItems:'center'}}
                                    ref={(c) => { _carousel = c; }}
                                    firstItem = {mode ? 0 : 1}
                                    onSnapToItem={index => index? setMode(false) : setMode(true)}
                                />
                            </SafeAreaView>
                        </View>
                        <GradientButton title="Confirm" onPress={handleConfirmPress}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '60%',
        position: 'absolute',
    },
    viewHolder: {
        flex: 6.5,
        width: '100%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor:'white'
    },
    contentHolder: {
        paddingTop: 30
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: font.textSemiBold,
        fontSize: 21
    },
    body: {
        margin: 10,
        height:'100%',  
        width: '80%',
        alignSelf: 'center',
    },
    bodyText: {
        fontFamily: font.textBold,
        fontSize: 20,
        color: '#005cb2'
    },
    input: {
        width: '100%'
    },
    confirmButton: {
    margin: 30,
    width : '50%',
    alignSelf : 'center',
    borderRadius: 26
    }, 
    confirmText: {
    fontFamily: font.textBold
  },
  modeHolder: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
 
  },
  title: {
    fontFamily: font.textBold,
        fontSize: 18,
        color: '#1e88e5'
  },
  slide :{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});