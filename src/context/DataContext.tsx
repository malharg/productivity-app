// src/context/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'; // REQUIRED for uuid
import { v4 as uuidv4 } from 'uuid';

// Define the shape of our data objects
export interface Task {
  id: string;
  title: string;
  status: 'inbox' | 'next-action' | 'done';
  projectId: string | null;
  contextId: string | null;
  isComplete: boolean;
}

export interface Project {
  id: string;
  name: string;
}

export interface AppContext {
  id: string;
  name: string;
}

// Define the shape of the context value
interface DataContextValue {
  tasks: Task[];
  projects: Project[];
  contexts: AppContext[];
  isLoading: boolean;
  addTask: (title: string) => void;
  addProject: (projectName: string) => Project;
  processTask: (
    taskId: string,
    action: {
      status: 'next-action';
      projectId: string | null;
      contextId: string | null;
    }
  ) => void;
  completeTask: (taskId: string) => void;
  // We will add more functions here
}

const STORAGE_KEY = '@productivity_app_data';

// Create the context with a default undefined value
export const DataContext = createContext<DataContextValue | undefined>(undefined);

// Define props for the provider
interface DataProviderProps {
  children: ReactNode;
}

// Create the provider component
export const DataProvider = ({ children }: DataProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contexts, setContexts] = useState<AppContext[]>([
    { id: '1', name: '@computer' },
    { id: '2', name: '@home' },
    { id: '3', name: '@errands' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTasks(parsedData.tasks || []);
          setProjects(parsedData.projects || []);
          if (parsedData.contexts) setContexts(parsedData.contexts);
        }
      } catch (e) {
        console.error('Failed to load data', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage
  useEffect(() => {
    if (!isLoading) {
      const saveData = async () => {
        try {
          const dataToStore = JSON.stringify({ tasks, projects, contexts });
          await AsyncStorage.setItem(STORAGE_KEY, dataToStore);
        } catch (e) {
          console.error('Failed to save data', e);
        }
      };
      saveData();
    }
  }, [tasks, projects, contexts, isLoading]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      status: 'inbox',
      projectId: null,
      contextId: null,
      isComplete: false,
    };
    setTasks([...tasks, newTask]);
  };

  const addProject = (projectName: string): Project => {
    const newProject: Project = {
      id: uuidv4(),
      name: projectName,
    };
    setProjects([...projects, newProject]);
    return newProject;
  };

  const processTask = (
    taskId: string,
    action: {
      status: 'next-action';
      projectId: string | null;
      contextId: string | null;
    }
  ) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: action.status,
              projectId: action.projectId,
              contextId: action.contextId,
            }
          : task
      )
    );
  };

  const completeTask = (taskId: string) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, isComplete: true, status: 'done' } : task
      )
    );
  };

  const value = {
    tasks,
    projects,
    contexts,
    isLoading,
    addTask,
    addProject,   
    processTask,
    completeTask,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};