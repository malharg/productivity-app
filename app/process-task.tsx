// app/process-task.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useData } from '../src/hooks/useData';
import DropDownPicker from 'react-native-dropdown-picker'; // <-- Import the new library

export default function ProcessTaskScreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, projects, contexts, addProject, processTask } = useData();

  const task = tasks.find(t => t.id === taskId);

  // State for the Context dropdown
  const [contextOpen, setContextOpen] = useState(false);
  const [contextValue, setContextValue] = useState<string | null>(contexts[0]?.id || null);
  const [contextItems, setContextItems] = useState(
    contexts.map(c => ({ label: c.name, value: c.id }))
  );

  // State for the Project dropdown
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectValue, setProjectValue] = useState<string | null>(null);
  const [projectItems, setProjectItems] = useState([
    { label: '-- No Project --', value: 'no_project' },
    ...projects.map(p => ({ label: p.name, value: p.id })),
    { label: '** Create New Project **', value: 'new_project' },
  ]);

  const [newProjectName, setNewProjectName] = useState('');

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found!</Text>
      </View>
    );
  }

  const handleProcess = () => {
    let finalProjectId: string | null = projectValue === 'no_project' ? null : projectValue;

    if (projectValue === 'new_project') {
      if (newProjectName.trim() === '') {
        Alert.alert('Error', 'Please enter a name for the new project.');
        return;
      }
      const newProject = addProject(newProjectName);
      finalProjectId = newProject.id;
    }

    if (!contextValue) {
      Alert.alert('Error', 'Please select a context.');
      return;
    }

    processTask(task.id, {
      status: 'next-action',
      projectId: finalProjectId,
      contextId: contextValue,
    });

    router.back();
  };

  return (
    <ScrollView 
        style={styles.container} 
        contentContainerStyle={{ paddingBottom: 200 }} // Add padding to avoid button being hidden by keyboard/dropdown
    >
      <Text style={styles.title}>Process Task</Text>
      <Text style={styles.taskTitle}>"{task.title}"</Text>

      {/* Context Picker */}
      <Text style={styles.label}>Assign a Context:</Text>
      <DropDownPicker
        open={contextOpen}
        value={contextValue}
        items={contextItems}
        setOpen={setContextOpen}
        setValue={setContextValue}
        setItems={setContextItems}
        listMode="SCROLLVIEW"
        zIndex={3000} // Ensures dropdown appears above other elements
        zIndexInverse={1000}
      />

      {/* Project Picker */}
      <Text style={styles.label}>Assign to a Project (Optional):</Text>
      <DropDownPicker
        open={projectOpen}
        value={projectValue}
        items={projectItems}
        setOpen={setProjectOpen}
        setValue={setProjectValue}
        setItems={setProjectItems}
        listMode="SCROLLVIEW"
        zIndex={2000} // Must be less than the one above it
        zIndexInverse={2000}
      />

      {projectValue === 'new_project' && (
        <TextInput
          style={styles.input}
          placeholder="New project name"
          value={newProjectName}
          onChangeText={setNewProjectName}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Define as Next Action" onPress={handleProcess} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginTop: 20, // Added more space between elements
    marginBottom: 10, // Added more space
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
      marginTop: 40, // Push the button down
  }
});