import React from 'react';
import { Platform, StyleSheet, View,Dimensions,Image,SafeAreaView,FlatList,TouchableOpacity,ActivityIndicator  } from 'react-native';
import {HeaderText,HeaderDescription,TransparentButtonText,ListItemText} from '../components/text';
import { TouchButton } from '../components/button';
import StatusBar from '../components/statusBar';
import SwitchToggle from "react-native-switch-toggle";
import {Headline} from '../components/header';
import {Text,ButtonGroup,Icon} from 'react-native-elements';
import { LoadingIndicator } from '../components/loadingIndicator';
import {getUserInformation,getDeviceOfRoom,getDetailOfRoom} from '../requests/request';
import color from '../config/color';
import font from '../config/font';
import size from '../config/size';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const _ = require('lodash');
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
export default function DeviceControl({navigation,route}) {
   const forceUpdate = useForceUpdate();
  const [device,setDevice] = React.useState([])
  const [room,setRoom] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  const [selectedIndex,updateIndex] = React.useState(0)
  const buttons = ['Fan', 'Air-conditioner']
  const getData = async () => {
      setLoading(true)
      const [deviceList,roomDetail] = await Promise.all([getDeviceOfRoom(route.params.roomId),getDetailOfRoom(route.params.roomId)])
      setRoom(roomDetail)
      setDevice(deviceList)
      setLoading(false)
    }
  React.useEffect(()=> {
    getData()
  },[])
  React.useEffect(()=> {
    navigation.addListener(
      'focus',
      payload => {
        forceUpdate();
      }
    );
  },[])
  const Item = ({ item, onPress,index}) => (
    <View style={styles.Item}>
        <View style={styles.ItemWrap}>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
                  <ListItemText value={item.name}/>
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
      const tempData = _.cloneDeep(selectedIndex == '0' ? device[0] : device[1]);
      const result = (item.State == 'On' ? 'Off' : 'On');
      tempData[index].State = result ;
      selectedIndex == '0' ? setDevice([tempData,device[1]]) : setDevice([device[0],tempData]);
  }
  const handleDevicePress = (item, index) => {
    navigation.navigate('DeviceControl',{deviceId:item.id, userId: route.params.userId})
  }
  const handleLogPress = () => {
    navigation.navigate('RoomLog',route.params)
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
    <View style={styles.container}>
        <StatusBar/>
        <SafeAreaView style ={styles.wrap}>
        <View style={styles.header}>
            <Headline/>
        </View>
        <View  style={styles.body}>
          <View style={styles.usable}>
            <View style={styles.heading}>
              <Text style={styles.heading1}>
                <HeaderText value="Control"/>
                <HeaderDescription value = {`Room ${room.Name}-${room.building}`}/>
              </Text>
              <View style={{marginRight: 0.04 * windowWidth,justifyContent:'center'}}>
                <Icon
                    name='cog' 
                    type='font-awesome-5' 
                    color='#2F81ED'
                    size={30}
                    onPress = {handleLogPress}
                />
              </View>
            </View>
                <TouchButton onPress={handleAddPress}>
                    <TransparentButtonText value='Add new device' />
                </TouchButton>
                <ButtonGroup
                  onPress={handleIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={styles.indexStyle}
                  textStyle={{fontSize: size.normal, fontFamily: font.textBold}}
                />
            <SafeAreaView style={styles.container}>
               <FlatList
                  data={selectedIndex == '0' ? device[0]: device[1]}
                  renderItem={renderItem}
                  keyExtractor={(item,index) => index.toString()}

               />
            </SafeAreaView>
          </View>
        </View>
        </SafeAreaView>
        
       
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
    height: 0.95 * windowHeight,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 47,
    borderTopRightRadius: 47
  },
  usable: {
    top: 0.03 * windowHeight,
    height: '100%',
    width: windowWidth,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading1: {
    marginLeft: size.margin
  },
  exit: {
    alignSelf: 'center',
    paddingLeft: 0.5 * windowWidth
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
  indexStyle: {
    elevation: 1,
    borderRadius: 8,
    borderWidth: 0
  },
});