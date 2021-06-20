import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet,View } from 'react-native';
const date = new Date();
const initialDate = new Date();
const maxDate = initialDate.setDate(initialDate.getDate() + 30);
export default function CalendarFunc({ onPress }) {
    return (
        <View style={styles.container}>
           <Calendar
            current={date}
            minDate={date}
            maxDate={maxDate}
            onDayPress={(day) => onPress(day)}
            onDayLongPress={(day) => onPress(day)}
            disableMonthChange={true}
            firstDay={1}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableAllTouchEventsForDisabledDays={true}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center'
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});