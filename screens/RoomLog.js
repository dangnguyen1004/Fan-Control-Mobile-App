import React from 'react';
import {View,StyleSheet,Text,Image,Animated, TouchableOpacity,SafeAreaView,FlatList } from 'react-native';
import {HeaderText} from '../components/text';
import StatusBar from '../components/statusBar';
import { getLogofRoomDate } from '../requests/request';
const textBold = 'Mulish-Bold';
const textSemiBold = 'Mulish-SemiBold';
const textMedium = 'Mulish-Medium';
const textRegular = 'Mulish-Regular';
const currentDate = new Date()
const DATA = [
  {
    id: '0',
    date: new Date(new Date().setDate(currentDate.getDate()-7))
  },
  {
    id : '1',
    date: new Date(new Date().setDate(currentDate.getDate()-6))
  },
  {
    id: '2',
    date: new Date(new Date().setDate(currentDate.getDate()-5))
  },
  {
    id: '3',
    date: new Date(new Date().setDate(currentDate.getDate()-4))
  },
  {
    id: '4',
    date: new Date(new Date().setDate(currentDate.getDate()-3))
  },
  {
    id: '5',
    date: new Date(new Date().setDate(currentDate.getDate()-2))
  },
  {
    id: '6',
    date: new Date(new Date().setDate(currentDate.getDate()-1))
  },
  {
    id: '7',
    date: currentDate
  }
];
const getDayString = (day) => {
  if (day == 0)
  {
    return 'Sun'
  }
  if (day == 1)
  {
    return 'Mon'
  }
  if (day == 2)
  {
    return 'Tue'
  }
  if (day == 3)
  {
    return 'Wed'
  }
  if (day == 4)
  {
    return 'Thu'
  }
  if (day == 5)
  {
    return 'Fri'
  }
  return 'Sar'
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const Item = ({ item,index,onPress ,dateChoose }) => {
  return (
    <TouchableOpacity style={(index == dateChoose ? {...styles.item,backgroundColor: '#2F81ED'} : styles.item)} onPress={onPress}>
      <Text style={(index == dateChoose ? {...styles.date, color: 'white'} : styles.date)}>{item.date.getDate()}</Text>
      <Text style={(index == dateChoose ? {...styles.title, color: 'white'} : styles.title)}>{getDayString(item.date.getDay())}</Text>
    </TouchableOpacity>
  )
};
const Item1 = ({item}) => {
  var h = addZero(item.time.toDate().getHours());
  var m = addZero(item.time.toDate().getMinutes());
  const time = h + ":" + m ;
  const action = (item.action == 'off' ? 'Turn off' : 'Turn on') 
  return(
  <View style={{...styles.item,alignItems: 'stretch'}}>
    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
      <Text>Hello</Text>
      <View>
        <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
          <Text style={{color: '#908C8C',fontFamily: textMedium}}>{time}</Text>
          <Text style={{color: '#908C8C',fontFamily: textMedium}}>{item.temp}°C</Text>
         <Text style={{color: '#908C8C',fontFamily: textMedium}}>{item.humid}%</Text>
        </View>
        <Text style={{margin: 5, fontFamily: textMedium,fontSize: 16}}numberOfLines={2}>{action} Quạt trần trên</Text>
        {item.hasOwnProperty('user') ? <Text style={{margin: 5,fontFamily: textMedium, alignSelf:'flex-end', color: '#908C8C'}}>by {item.userName}</Text> : <Text style={{margin: 5, fontFamily: textMedium,fontSize: 16}}>Automatically</Text>}
      </View>
    </View>
  </View>
  )
};
const ListEmptyComponent = () => (
   <View>
    <Text style={{fontFamily: textBold, color: 'gray',fontSize: 18,alignSelf: 'center'}}>There is no log for this day.</Text>
  </View>
)
export default function RoomLog({navigation , route}) {
  const [dateChoose,setDateChoose] =React.useState(7)
  const [date,setDate] = React.useState(currentDate)
  const [log,setLog]  =React .useState([])
  const [refreshing,setRefresh] =React.useState(false)
  const scrollViewRef = React.useRef();
  React.useEffect(() => {
    const getData = async () => {
        const data = await getLogofRoomDate(route.params.roomId,date)
        setLog(data)
    }
    getData()
  },[date])
  const handleRefresh = () => {
     const getData = async () => {
        setRefresh(true)
        const data = await getLogofRoomDate(route.params.roomId,date)
        setLog(data)
        setRefresh(false)
    }
    getData()
  }
  const handleDatepress= (item,index) => {
      setDateChoose(index)
      setDate(item.date)
  }
  const renderItem = ({ item,index }) => (
    <Item item={item} index={index} onPress={() => handleDatepress(item,index)} dateChoose={dateChoose}/>
  );
  const renderItem1 = ({ item,index }) => (
    <Item1 item={item} index={index} />
  );
    return (
        <View style={styles.container}>
           <StatusBar/>
            <HeaderText value= "Room Log" />
            <SafeAreaView style={styles.header}>
                <FlatList
                    horizontal
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                />
            </SafeAreaView>
            <View style={styles.body}>
                <SafeAreaView style={styles.bodyList}>
                   <FlatList
                    data={log}
                    renderItem={renderItem1}
                    keyExtractor={(item,index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    ListEmptyComponent={ListEmptyComponent}
                />
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1
    },
     item: {
    backgroundColor: '#FBFBFB',
     padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    elevation: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  title: {
    fontSize: 18,
    color: '#908C8C',
  },
  header: {
      flex : 2,
      width: '95%',
      alignSelf: 'center'
  },
  body: {
      flex: 8,
      justifyContent: 'center'
  },
  headerText: {
    fontSize: 30,
    color: '#2F81ED',
    fontFamily: textBold,
    marginLeft: 10
  },
  date: {
      fontFamily: textBold,
      fontSize: 30,
      color: '#666666'
  },
  bodyList: {
    width: '95%',
    height: '80%',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: 0.8
  },
})