import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function TodoApp() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([
    { id: '1', text: 'Belajar useState', done: true },
    { id: '2', text: 'Build Counter App', done: true },
    { id: '3', text: 'Build Todo App', done: false },
  ]);

  const handleAdd = () => {
    if (inputText.trim() === '') {
      Alert.alert('Hei!', 'Tulis dulu todo-nya bro 😅');
      return;
    }
    const newTodo = {
      id: Date.now().toString(),
      text: inputText.trim(),
      done: false,
    };
    setTodos(prev => [...prev, newTodo]);
    setInputText('');
  };

  const handleToggle = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const doneCount = todos.filter(t => t.done).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Todo App</Text>
      <Text style={styles.progress}>
        {doneCount}/{todos.length} selesai{doneCount === todos.length && todos.length > 0 ? ' 🎉 Semua beres!' : ''}
      </Text>

      <View style={styles.inputRow}>
        <TextInput 
          style={styles.input} 
          value={inputText} 
          onChangeText={text => setInputText(text)} 
          placeholder="Tambah todo baru..." 
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity style={styles.todoLeft} onPress={() => handleToggle(item.id)}>
              <Text style={styles.checkbox}>{item.done ? '✅' : '⬜'}</Text>
              <Text style={[styles.todoText, item.done && styles.todoDone]}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
              <Text style={styles.deleteTxt}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {doneCount > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={() => setTodos(prev => prev.filter(t => !t.done))}>
          <Text style={styles.clearTxt}>🗑 Hapus {doneCount} yang selesai</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 55, paddingHorizontal: 20 },
  title:      { fontSize: 26, fontWeight: '900', color: '#2d3436', marginBottom: 4 },
  progress:   { fontSize: 14, color: '#00b894', fontWeight: '600', marginBottom: 16 },
  inputRow:   { flexDirection: 'row', gap: 10, marginBottom: 16 },
  input:      { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, borderWidth: 1, borderColor: '#dfe6e9' },
  addBtn:     { backgroundColor: '#00b894', borderRadius: 12, width: 48, alignItems: 'center', justifyContent: 'center' },
  addBtnText: { color: '#fff', fontSize: 26, fontWeight: '700' },
  todoItem:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#dfe6e9' },
  todoLeft:   { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
  checkbox:   { fontSize: 20 },
  todoText:   { fontSize: 14, color: '#2d3436', flex: 1 },
  todoDone:   { textDecorationLine: 'line-through', color: '#b2bec3' },
  deleteBtn:  { padding: 4 },
  deleteTxt:  { fontSize: 18 },
  clearBtn:   { backgroundColor: '#ffeef3', borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#fd79a8' },
  clearTxt:   { color: '#e84393', fontWeight: '700', fontSize: 13 },
});