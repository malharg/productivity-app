// app/(tabs)/inbox.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useData } from '../../src/hooks/useData';
import TaskInput from '../../src/components/TaskInput';
import { Task } from '../../src/context/DataContext';

export default function InboxScreen() {
  const { tasks, addTask, isLoading } = useData();

  // Filter tasks to only show those in the 'inbox'
  const inboxTasks = tasks.filter(task => task.status === 'inbox');

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={inboxTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
            </View>
          )}
          ListEmptyComponent={<View style={styles.emptyContainer}><Text>Inbox is clear!</Text></View>}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        <TaskInput onAddTask={addTask} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskTitle: {
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});