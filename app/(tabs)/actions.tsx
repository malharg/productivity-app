// app/(tabs)/actions.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { useData } from '../../src/hooks/useData';

export default function NextActionsScreen() {
  const { tasks, projects, contexts, completeTask, isLoading } = useData();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Memoize the filtered tasks to prevent recalculating on every render
  const nextActions = useMemo(() => {
    let actions = tasks.filter(task => task.status === 'next-action' && !task.isComplete);
    
    if (activeFilter) {
      // Check if filtering by project or context
      if (activeFilter.startsWith('@')) {
        const contextId = contexts.find(c => c.name === activeFilter)?.id;
        actions = actions.filter(task => task.contextId === contextId);
      } else {
        const projectId = projects.find(p => p.name === activeFilter)?.id;
        actions = actions.filter(task => task.projectId === projectId);
      }
    }
    return actions;
  }, [tasks, activeFilter, projects, contexts]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const getProjectName = (projectId: string | null) => {
    return projects.find(p => p.id === projectId)?.name;
  };

  const getContextName = (contextId: string | null) => {
    return contexts.find(c => c.id === contextId)?.name;
  };

  const renderFilterButtons = () => {
    const projectFilters = projects.filter(p => nextActions.some(t => t.projectId === p.id));
    const contextFilters = contexts.filter(c => nextActions.some(t => t.contextId === c.id));
    
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, !activeFilter && styles.activeFilter]} 
          onPress={() => setActiveFilter(null)}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        {projectFilters.map(p => (
          <TouchableOpacity 
            key={p.id}
            style={[styles.filterButton, activeFilter === p.name && styles.activeFilter]} 
            onPress={() => setActiveFilter(p.name)}>
            <Text style={styles.filterText}>{p.name}</Text>
          </TouchableOpacity>
        ))}
        {contextFilters.map(c => (
          <TouchableOpacity 
            key={c.id}
            style={[styles.filterButton, activeFilter === c.name && styles.activeFilter]} 
            onPress={() => setActiveFilter(c.name)}>
            <Text style={styles.filterText}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderFilterButtons()}
        <FlatList
          data={nextActions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View style={styles.taskDetails}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <View style={styles.tagsContainer}>
                  {item.projectId && <Text style={styles.projectTag}>{getProjectName(item.projectId)}</Text>}
                  {item.contextId && <Text style={styles.contextTag}>{getContextName(item.contextId)}</Text>}
                </View>
              </View>
              <TouchableOpacity style={styles.completeButton} onPress={() => completeTask(item.id)}>
                 <Text style={styles.completeButtonText}>✓</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<View style={styles.emptyContainer}><Text>No next actions. Process some from your inbox!</Text></View>}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flex: 1 },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  projectTag: {
    backgroundColor: '#d1e7dd',
    color: '#0f5132',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 12,
    marginRight: 5,
    overflow: 'hidden',
  },
  contextTag: {
    backgroundColor: '#cff4fc',
    color: '#055160',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 12,
    overflow: 'hidden',
  },
  completeButton: {
    marginLeft: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#888',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexWrap: 'wrap', // Allow buttons to wrap to the next line
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    margin: 5,
  },
  activeFilter: {
    backgroundColor: '#0d6efd', // A blue color for active
  },
  filterText: {
    color: 'black'
  }
});