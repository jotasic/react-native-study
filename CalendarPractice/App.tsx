import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const {width : SCREEN_WIDTH} = Dimensions.get("window");

interface DayLogType {
  [key: number] : string,
  text: string
}

export default function App() {
  const [dayLogs, setDayLogs] = useState<DayLogType|any>({});
  const [monthLogs, setMonthLogs] = useState<DayLogType|any>({});

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Calendar style={styles.calendar}
        markingType='multi-period'
        markedDates={monthLogs}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    marginTop: 30,
    width: SCREEN_WIDTH
  },
  dayLogs: {
    flex: 1,
    justifyContent: 'space-between'
  },
  log: {
    backgroundColor: 'tomato',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    
  }
});
