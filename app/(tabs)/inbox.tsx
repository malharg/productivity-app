// app/(tabs)/inbox.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useData } from '../../src/hooks/useData';
import TaskInput from '../../src/components/TaskInput';
import { useRouter } from 'expo-router'; // Import useRouter instead of Link


export default function InboxScreen() {
  const { tasks, addTask, isLoading } = useData();
  const router = useRouter();

  // Filter tasks to only show those in the 'inbox'
  const inboxTasks = tasks.filter(task => task.status === 'inbox');

  const handleTaskPress = (taskId: string) => {
    router.push({
      pathname: '/process-task' as any,
      params: { taskId }
    });
  };

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
            // Wrap the task item in a Link component
            <TouchableOpacity onPress={() => handleTaskPress(item.id)}>
              <View style={styles.taskItem}>
                <Text style={styles.taskTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
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