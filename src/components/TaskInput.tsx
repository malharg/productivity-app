// src/components/TaskInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [title, setTitle] = useState('');

  const handleAddTask = () => {
    if (title.trim()) { // Only add if the title isn't empty
      onAddTask(title.trim());
      setTitle(''); // Clear the input field
      Keyboard.dismiss(); // Hide the keyboard
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task, idea, or to-do..."
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleAddTask} // Allows submitting with the keyboard's "return" key
      />
      <Button title="Add" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default TaskInput;