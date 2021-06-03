export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(data => {
        let item = data.val();
        item.key = data.key
        returnArr.push(item)
    });
    
    return returnArr;
}