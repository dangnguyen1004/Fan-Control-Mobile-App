import React from 'react';
import {StyleSheet, View ,Dimensions,SafeAreaView,SectionList,ActivityIndicator  } from 'react-native';
import StatusBar from '../components/statusBar';
import {Headline} from '../components/header';
import { SearchBar } from '../components/searchBar';
import { HeaderText,HeaderDescription, SubHeaderText,ListItemText,ListEmptyText } from '../components/Text';
import { Touch } from '../components/button';
import { LoadingIndicator} from '../components/loadingIndicator';
import {getUserInformation,getRoomAvailableUser} from '../requests/request';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const listEmptyComponent = () => (
          <ListEmptyText value='You have no scheduled room today!'/>

)
const Item = ({ item, onPress}) => (
    <Touch onPress ={onPress}>
        <ListItemText value={`Room ${item.Name}`} />
    </Touch>
);
export default function ChooseRoom({navigation,route}) {
  const [loading,setLoading] = React.useState(true)
  const [data,setData] = React.useState({})
  const [dataFiltered,setDataFiltered] = React.useState()
  const [refreshing,setRefreshing] = React.useState(false)
  const [user,setUser]  =React.useState({})
  React.useEffect(()=>{
      const getData = async () => {
        const user = await getUserInformation();
        setUser(user);
        const response = await getRoomAvailableUser(user.id);
        setData(response);
        setLoading(false);
      }
      setLoading(true)
      getData()
  },[])
  const searchRoom = (text) => {
    const result =  []
    if (data.length === 0)
    {
      return
    }
    data.forEach((element) => {result.push(element.data.filter(i => i.Name.includes(text)))})
    setDataFiltered([{title: 'H1', data: result[0]},{title: 'H2',data: result[1]}])
  }
  const onRefresh = async () => {
    setRefreshing(true)
    const response = await getRoomAvailableUser(user.id);
    setData(response);
    setRefreshing(false)
  }
  const handleRoomPress = (item) => {
    navigation.navigate('RoomControl',{userId : user.id , roomId: item.id})
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
              <HeaderText value="Control"/>
            </View>
            <HeaderDescription value="Choose room"/>
              <SearchBar onChangeText={(text) => searchRoom(text)}/>
            <SafeAreaView style={styles.container}>
              <SectionList
                sections={dataFiltered == undefined ? data : dataFiltered}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} onPress={()=> handleRoomPress(item)} />}
                renderSectionHeader={({ section: { title } }) => (
                  <SubHeaderText value = {title}/>
                )}
                onRefresh={() => onRefresh()}
                refreshing={refreshing}
                ListEmptyComponent={listEmptyComponent}
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
    height: 0.92*windowHeight,
    width: windowWidth,
  },
  heading: {
    flexDirection: 'row'
  },
});