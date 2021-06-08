
import firebase from '@firebase/app';
import '@firebase/firestore';
async function getUserInformation(userID) {
  try {
    const usersRef = firebase.firestore().collection('users')
    const userInfo = await  usersRef.doc(userID).get()       
    if (!userInfo.exists) {
      throw("User is no longer exist!")
    }
    return userInfo.data()
  }
  catch (error) {
    return error
  }
}

async function getRoomOfBuilding(building) {
   try
    {
      
      const roomRef = firebase.firestore().collection('room')
      const roomList = await roomRef.where('building','==',building).get()
      if (!roomList) {
        throw("Undefined error!")
      }
      const data = []
      roomList.forEach((item) => {
      data.push({
          ...item.data(),
          key: item.id,
        })
      })
      return data
      
    }
  catch (error) {
    return error
  }
}


export {getUserInformation,getRoomOfBuilding};