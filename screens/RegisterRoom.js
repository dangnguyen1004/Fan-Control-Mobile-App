import React from 'react';
import { Platform, StyleSheet, View,Dimensions,KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback,Keyboard,SafeAreaView,FlatList,Animated,ActivityIndicator  } from 'react-native';
import StatusBar from '../components/statusBar';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import { FlatListItemSeparator } from '../components/separator';
import {Text,Input,Button,Overlay} from 'react-native-elements';
import { HeaderText,SubHeaderText,HeaderDescription,ListItemText } from '../components/text';
import { GrayButton } from '../components/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/images/logout.svg';
import { LoadingIndicator } from '../components/loadingIndicator';
import {getRoomAvailableUser, getRoomOfBuilding,sendRoomRequest} from '../requests/request';
import Calendar from '../components/calendar';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const initialDate =new Date().toISOString().split('T')[0];
const Item = ({ item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <ListItemText value={item.building}/>
    </TouchableOpacity>
  );
const Item1 = ({ item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <ListItemText value={item.Name}/>
    </TouchableOpacity>
  );
const buildingList = [
  {building: 'H1' , key: '1'},
  {building: 'H2', key: '2'}
 ]
export default function RegisterRoom({ navigation, route}) {
  const [loading,setLoading] = React.useState(true)
  const [building,setBuilding] = React.useState({building : 'H1', key: '1'})
  const [room,setRoom] = React.useState({Name: '101', key: '1C37KpggUMI9GyuuK2sC'})
  const [date,setDate] = React.useState({dateString: initialDate})
  const [visibleBuilding,setVisibleBuilding] = React.useState(false);
  const [visibleRoom,setVisibleRoom] = React.useState(false);
  const [visibleDate,setVisibleDate] = React.useState(false);
  const [roomList,setRoomData] = React.useState([]);
  const renderItem = ({ item  }) => {
    return (
      <Item
        item={item}
        onPress={() => handleBuildingItemPress(item)}
      />
    );
  };
  const renderItem1 = ({ item  }) => {
    return (
      <Item1
        item={item}
        onPress={() => {setVisibleRoom(false);setRoom(item)}}
      />
    );
  };
  
    React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const roomList = await getRoomOfBuilding();
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRoomData(roomList);
      setRoom(roomList[0][0]);
      setLoading(false);
    }
    getData();
  },[]);
  const handleBuildingItemPress = (item) => {
    setBuilding(item)
    setVisibleBuilding(!visibleBuilding)
    if (item.key == 1)
    {
      setRoom(roomList[0][0])
    }
    else
    {
      setRoom(roomList[1][0])
    }
  }
  const handleBuildingPress = () => {
    setVisibleBuilding(!visibleBuilding)
  }
  const handleRoomPress = () => {
    setVisibleRoom(!visibleRoom)
  }
  const handleDatePress =() => {
    setVisibleDate(!visibleDate)
  }
  const handleDateChoose = (date) => {
      setDate(date);
      setVisibleDate(!visibleDate);
  }
  const handleOnRegisterPress =  async () => {
      await sendRoomRequest(route.params.id,room.id,date.dateString)
      navigation.goBack()
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
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar/>
        <View style={styles.header}>
          <Headline/>
        </View>
        <View  style={styles.body}>
          <View style={styles.usable}>
            
          <View style={styles.heading}>
            <HeaderText value="Register room" />
          </View>
            <HeaderDescription value="Choose room"/>
          <SubHeaderText value="Building" />
          <View style={styles.holder}>
            <InfoBox value = {building.building} dropDown={true} onPress={handleBuildingPress}/>
          </View>
          <SubHeaderText value="Room" />
          <View style={styles.holder}>
          <InfoBox value = {room.Name} dropDown={true} onPress={handleRoomPress}/>
          </View>
          <SubHeaderText value="Time" />
          <View style={styles.holder}>
            <InfoBox value = {date.dateString} dropDown={true} onPress={handleDatePress}/>
          </View>
          <GrayButton
              title="Register room"
              onPress={handleOnRegisterPress}
          />
          <Overlay isVisible={visibleBuilding} onBackdropPress={handleBuildingPress} overlayStyle={styles.Overlay}>
             <SafeAreaView style={styles.container}>
              <FlatList
                data={buildingList}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                ItemSeparatorComponent={FlatListItemSeparator}
              />
            </SafeAreaView>
          </Overlay>
          <Overlay isVisible={visibleRoom} onBackdropPress={handleRoomPress} overlayStyle={styles.Overlay}>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={building.building == 'H1' ? roomList[0] : roomList[1]}
                renderItem={renderItem1}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={FlatListItemSeparator}
              />
              </SafeAreaView>
          </Overlay>
            <Overlay isVisible={visibleDate} onBackdropPress={handleDatePress} overlayStyle={styles.Overlay}>
              <SafeAreaView style={styles.container}>
                <Calendar onPress={(date) => handleDateChoose(date)}/>
              </SafeAreaView>
          </Overlay>
        </View>
        </View>
        </KeyboardAvoidingView>
    );
  }
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
    fontFamily: textBold,
    color: '#2F81ED'
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
    fontFamily: textBold
  },
  title: {
    left: 0.04 * windowWidth,
    color: '#908C8C',
    fontSize: 20,
    paddingTop: 0.0015 * windowHeight,
    fontFamily: textSemiBold

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
  Overlay: {
    width: '60%',
    height: '80%',
    position: 'absolute'
  },
  dateOverlay: {
    height: '80%',
    width: '80%'
  },
    item: {
      marginBottom: 10,
      marginTop: 10, 
      width: '100%',
  },
  ItemText: {
    fontSize: 20,
    fontFamily: textMedium
  }
});