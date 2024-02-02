import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { TaskProvider } from './Provider/TaskContext';

interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

function App(): JSX.Element {
  // State pour stocker la liste de tâches
  const [tasks, setTasks] = useState<Task[]>([]);
  // State pour stocker les détails de la tâche en cours d'édition
  const [editTask, setEditTask] = useState<Task | null>(null);
  // State pour contrôler l'ouverture/fermeture du modal d'édition
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Fonction pour ajouter une nouvelle tâche à la liste
  const addTask = (title: string): void => {
    const newTaskItem: Task = { id: Date.now(), title, content: '', completed: false };
    setTasks([...tasks, newTaskItem]);
  };

  // Fonction pour supprimer une tâche de la liste
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Fonction pour Set l'état d'une tâche
  const toggleComplete = (id: number): void => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Fonction pour ouvrir le modal d'édition d'une tâche
  const openEditModal = (task: Task): void => {
    setEditTask(task);
    setOpenModal(true);
  };

  // Fonction pour enregistrer les modifications d'une tâche éditée
  const saveEditedTask = (): void => {
    if (editTask) {
      setTasks(
        tasks.map(task =>
          task.id === editTask.id ? { ...task, title: editTask.title, content: editTask.content } : task
        )
      );
      setOpenModal(false);
    }
  };


  return (
    <TaskProvider>
      <Container sx={{ display: 'flex', py: 5, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }} maxWidth="sm">
        
        <Typography sx={{ py: 4, fontFamily: 'Segoe UI', fontSize: '42px', fontWeight: '700', color: "#f88198" }}>Todo List App</Typography>
        
        <Box p={4} sx={{ width: '100%', backgroundColor: '#fff', borderRadius: 3, boxShadow: '3px 3px 40px -1px rgba(70,82,157,0.23)' }}>
          
          {/* ---- Section ajouter une nouvelle tâche ---- */}
          <TaskForm addTask={addTask} />

          {/* ---- Affichage du nombre de tâches non terminées ---- */}
          <Box sx={{ my: 2, borderRadius: 1 }}>

            <Typography sx={{ color: '#e5bc5d', py: .5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentLateIcon sx={{ fontSize: '19px' }} />
              {tasks.filter(task => !task.completed).length} tâche(s) non terminée(s)
            </Typography>
            
            {tasks.filter(task => task.completed).length > 0 && (
              <Typography sx={{ color: '#61c2cd', py: .5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TaskAltIcon sx={{ fontSize: '19px' }} />
                {tasks.filter(task => task.completed).length} tâche(s) terminée(s)
              </Typography>
            )}
          </Box>

          {/* ---- Liste des tâches ---- */}
          <Typography sx={{ py: 2, fontWeight: '700' }}>Liste des tâches :</Typography>
          <TaskList tasks={tasks} toggleComplete={toggleComplete} openEditModal={openEditModal} deleteTask={deleteTask} />
          
          {/* ---- Modal d'édition d'une tâche ---- */}
          <TaskModal open={openModal} onClose={() => setOpenModal(false)} editTask={editTask} saveEditedTask={saveEditedTask} setEditTask={setEditTask} />
        </Box>
      </Container>
    </TaskProvider>
  );
}

export default App;
