import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

export default function App() {
  // useState를 이용해서 todo list의 상태를 만든다.
    // 첫 인자 현재 상태
    // 두번째 인자 상태를 세팅할 함수 (여기서는 계속 추가)
  const [todos, setTodos] = useState<Todo[]>([]);

  // 새로운 todo가 추가되면 기존에 있던 (todos) 항목에 새로운 항목이 추가 된다.
  const addTodo = (text:string) => {
    setTodos([
      ...todos,
      {id: Math.random().toString(), textValue: text, checked: false},
    ]);
  };

  const onRemove = (id:string) => (e:any) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onToggle = (id:string) => (e:any) => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo,),
    )
  };


  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Todo List</Text>
      <View style={styles.card}>
        <TodoInsert onAddTodo={addTodo}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3143e8',
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    backgroundColor: '#3143e8',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});
