import React from 'react';
import { Platform, StyleSheet, View, StatusBar ,Dimensions,KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback,Keyboard,SafeAreaView,FlatList  } from 'react-native';
import {Headline} from '../components/header';
import {InfoBox} from '../components/infoBox';
import {Text,Input,Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../assets/logout.svg';
import {getRoomOfBuilding} from '../requests/request';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
  const Item = ({ item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={[styles.title]}>{item.building}</Text>
    </TouchableOpacity>
  );
 const Item1 = ({ item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={[styles.title]}>{item.Name}</Text>
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
  const [visibleBuilding,setVisibleBuilding] = React.useState(false);
  const [visibleRoom,setVisibleRoom] = React.useState(false);
  const [roomList,setRoomData] = React.useState([]);
  const renderItem = ({ item  }) => {
    return (
      <Item
        item={item}
        onPress={() => setBuilding(item)}
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
      const roomList = await getRoomOfBuilding(building.building);
      setRoomData(roomList);
      setRoom(roomList[0]);
      setLoading(false);
      setVisibleBuilding(false);
    }
    getData();
  },[building]);
  const handleBuildingPress = () => {
    setVisibleBuilding(!visibleBuilding)
  }
  const handleRoomPress = () => {
    setVisibleRoom(!visibleRoom)
  }
  const handleOnRegisterPress = () => {
      const data = { userId: route.params.id, roomId : room.key }
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
      <KeyboardAvoidingView style={styles.container}>
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
            <Text style={styles.account}>Register room</Text>
          </View>
          <Text style={styles.completeP} >Choose room</Text>
          <Text style={styles.title}>Building</Text>
          <View style={styles.holder}>
            <InfoBox value = {building.building} dropDown={true} onPress={handleBuildingPress}/>
          </View>
          <Text style={styles.title}>Room</Text>
          <View style={styles.holder}>
            <InfoBox value = {room.Name} dropDown={true} onPress={handleRoomPress}/>
          </View>
          <Button containerStyle = {styles.register}
            buttonStyle = {styles.button}
            title="Register room"
            onPress= {handleOnRegisterPress}
        />
          <Overlay isVisible={visibleBuilding} onBackdropPress={handleBuildingPress} >
            <SafeAreaView style={styles.container}>
              <FlatList
                data={buildingList}
                renderItem={renderItem}
                keyExtractor={item => item.key}
              />
            </SafeAreaView>
          </Overlay>
          <Overlay isVisible={visibleRoom} onBackdropPress={handleRoomPress}>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={roomList}
                renderItem={renderItem1}
                keyExtractor={item => item.key}
              />
            </SafeAreaView>
          </Overlay>

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
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
    bottom: 0.005 * windowHeight,
    position: 'absolute'
  },
  navigationButton:
  {
    width: '50%'
  },
    item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});