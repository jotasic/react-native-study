import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TodoListItem = ({textValue, id, checked, onRemove, onToggle}:any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPressOut={onToggle(id)}>
                <View style={styles.completeCircle}>
                  <AntDesign name="checkcircleo" size={30} color="#3134e8"/>
                </View>
            </TouchableOpacity>
            <Text style={[styles.text, checked ? styles.strikeText : styles.unstrikeText]}>{textValue}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPressOut={onRemove(id)}>
              <View>
                    <AntDesign name="delete" size={30} color="#e33057"/>
              </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      flex: 5,
      fontWeight: '500',
      fontSize: 18,
      marginVertical: 20,
      width: 100,
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderColor: 'blue',
      borderWidth: 2,
      marginRight: 20,
      marginLeft: 20,
    },
    completeCircle: {
      marginRight: 20,
      marginLeft: 20,
    },
    strikeText: {
      color: '#bbb',
      textDecorationLine: 'line-through',
    },
    unstrikeText: {
      color: '#29323c',
    },
    buttonContainer: {
      marginVertical: 10,
      marginHorizontal: 10,
    },
  });
  
  export default TodoListItem;