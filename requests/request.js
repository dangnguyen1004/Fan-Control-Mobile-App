
import firebase from '@firebase/app';
import '@firebase/firestore';
async function getUserInformation() {
    const usersRef = firebase.firestore().collection('users');
    var uid;
  try{
    var unsubscribe =await firebase.auth().onAuthStateChanged(user => {
      if (user) {
          uid= user.uid;
      } 
      else {
      }
    });
    unsubscribe();
    const userInfo = await  usersRef.doc(uid).get()       
    if (!userInfo.exists) {
      throw("User is no longer exist!")
    }
    return userInfo.data()
  }
  catch (error) {
      return(error)
  }
}

async function sendRoomRequest (userID,roomID,_time) {
   const dateSplit = _time.split('-')
   const time = new Date(dateSplit[0],dateSplit[1]-1,dateSplit[2])
  try {
  const pendingRoomRef = firebase.firestore().collection('pendingRoom')
  await pendingRoomRef.add({
    user: userID,
    room: roomID,
    time: firebase.firestore.Timestamp.fromDate(time)
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    throw("gay")
});
  }
  catch (error) {
    return(error)
  } 

}

async function addDevice(roomId,userId,_name,_type,_mode) {
  if (_type == 'Fan')
  {
    _type = 'fan'
  }
  else{
    _type = 'ac'
  }
  if (_mode == 'Auto')
  {
    _mode = true
  }
  else
  {
    _mode = false
  }
  try {
    const deviceRef = firebase.firestore().collection('device').doc()
    await deviceRef.set({
      id: deviceRef.id,
      name: _name,
      type: _type,
      mode: _mode,
      room: roomId,
      state: true,
      lowHumid: 30,
      lowTemp: 20,
      upHumid: 70,
      upTemp: 37
    })
    .then((docRef) => {
    })
    .catch((error) => {
        throw("gay")
    });
  }
  catch (error) {
    return(error)
  }
}

async function getRoomOfBuilding() {
   try
    {
      
      const roomRef = firebase.firestore().collection('room')
      const roomList = await roomRef.get()
      if (!roomList) {
        throw("Undefined error!")
      }
      const roomOfH1 = []
      const roomOfH2 = []
      roomList.forEach((item) => {
        if (item.data().building == 'H1')
        {
            roomOfH1.push({
                ...item.data(),
            
          })
        }
        else
        {
            roomOfH2.push({
              ...item.data(),
              
          })
        }
      })
      return [roomOfH1,roomOfH2]
      
    }
  catch (error) {
    return error
  }
}
async function getDetailOfRoom(roomId) {
  try
  {
    const roomRef = firebase.firestore().collection('room')
    const room = await roomRef.doc(roomId).get()
    if (!room) {
      throw("Undefined error!")
    }
    return room.data()
  }
  catch (error) {
    return error
  }
}
async function getDeviceOfRoom(roomId) {
   try
    {
      const fan = []
      const ac = []
      const deviceRef = firebase.firestore().collection('device')
      await deviceRef.where('room','==',roomId).onSnapshot((querySnapshot) => {
        fan.splice(0,fan.length)
        ac.splice(0,ac.length)
        querySnapshot.forEach((doc) => {
           if (doc.data().type == 'fan')
           {
             fan.push(doc.data())
           }
           else
           {
             ac.push(doc.data())
           }
        })
      })
      return [fan,ac]
    }
  catch (error) {
    return error
  }
}

async function getDevice(deviceId) {
  try {
     
      const deviceRef = firebase.firestore().collection('device')
      const device = await deviceRef.doc(deviceId).get()
      if (!device) {
      throw("Undefined error!")
    }
      return device.data()
  }
  catch (error) {
    return error
  }
}
async function getRoomAvailableUser(userId) {
  const time = new Date();
  try {
      const confirmRoom = firebase.firestore().collection('pendingRoom')
      const roomRef = firebase.firestore().collection('room')
      const id = [] 
      const roomOfH1 = []
      const roomOfH2 = []
      await confirmRoom.where('user','==',userId)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (time.toDateString() == doc.data().time.toDate().toDateString())
                {
                  id.push(doc.data().room)
                }
              });
            })
            .catch((error) => {
              throw(error)
            })
      if (id.length === 0)
      {
        return []
      }
      await roomRef.where('id','in',id)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc)=> {
                  if (doc.data().building == 'H1')
                  {
                    roomOfH1.push(doc.data())
                  }
                  else
                  {
                    roomOfH2.push(doc.data())
                  }
              });
            })
            .catch((error) => {
              throw(error)
            })
      return [{title: 'H1' , data: roomOfH1}, {title: 'H2', data: roomOfH2}]
  }
  catch (error) {
    return error
  }
}

async function updateDeviceLimit(deviceId,upTemp,upHumid,lowTemp,lowHumid) {
   try {
  const deviceRef = firebase.firestore().collection('device')
  await deviceRef.doc(deviceId).set({
    upTemp: upTemp,
    upHumid: upHumid,
    lowTemp: lowTemp,
    lowHumid: lowHumid
    },
    {merge: true})
    .then((docRef) => {
    })
    .catch((error) => {
        throw(error)
    })
  }
  catch (error) {
    return error
  }
}
async function updateDeviceNM(deviceId,deviceName,deviceMode) {
  try {
  const deviceRef = firebase.firestore().collection('device')
  await deviceRef.doc(deviceId).set({
    name : deviceName,
    mode : deviceMode
    },
  {merge: true})
    .then((docRef) => {
    })
    .catch((error) => {
        throw("gay")
    })
  }
  catch (error) {
    return error
  }
    
}

async function getLogofRoomDate(roomId,date) {
  const startDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0)
  const endDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),23,59,59,999)
  try {
    const data = []
    const logRef = firebase.firestore().collection('log')
    await logRef.where('room','==',roomId).where('time','>=',startDate).where('time','<=',endDate).get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              data.push(doc.data())
            })
          }
          )
           .catch((error) => {
              throw(error)
            })
    return data
  }
  catch (error) {
    return (error)
  }
}
export {getUserInformation,getRoomOfBuilding,sendRoomRequest,getRoomAvailableUser,getDeviceOfRoom,getDetailOfRoom,addDevice,getDevice,updateDeviceNM,updateDeviceLimit,getLogofRoomDate};