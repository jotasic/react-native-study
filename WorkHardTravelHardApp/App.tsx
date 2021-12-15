import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface TodoType {
    [key: number]: string,
    text: string,
    working: boolean
  };

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setTodos] = useState<TodoType|any>({});
  useEffect(() => {
    loadToDos();
   }, [])

  const STORAGE_KEY = '@toDos';

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload:string) => setText(payload);
  const saveToDos = async (toSave:TodoType|any) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY) || '';
    setTodos(JSON.parse(s));
  }

  const addTodo = async () => {
    if(text === ''){
      return;
    }

    const newToDos = {
      ...toDos, 
      [Date.now()]: {text, working}
    };

    setTodos(newToDos);
    await saveToDos(newToDos);
    setText('');
  }

  const deleteTodo = async (key:string) => {
    Alert.alert('Delete To Do', 'Are you sure?', 
    [{text: 'Cancel'}, {text:`I'm sure`, onPress: async () => {
    const newToDos = {...toDos, };
    delete newToDos[key];
    setTodos(newToDos);
    await saveToDos(newToDos);
    }}])
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
          <TouchableOpacity onPress={work}>
            <Text style={{...styles.btnText, color: working? 'white' : theme.grey}}> Work</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text style={{...styles.btnText, color: !working? 'white' : theme.grey}}> Travel</Text>
          </TouchableOpacity>
        </View>
          <TextInput 
            onSubmitEditing={addTodo}
            value={text}
            onChangeText={onChangeText}
            returnKeyType='done'
            placeholder={working? 'Add To Do' : 'Where do you want to go?'} 
            style={styles.input}/>
          <ScrollView> 
            {Object.getOwnPropertyNames(toDos).map(key => 
              toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteTodo(key)}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>) : null
            )}
          </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});