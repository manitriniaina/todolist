import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, content: '', completed: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};
