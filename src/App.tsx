import './App.css';
import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal, Container, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Interface pour définir la structure d'une tâche
interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

function App(): JSX.Element {
  // State pour stocker la liste de tâches
  const [tasks, setTasks] = useState<Task[]>([]);
  // State pour stocker le titre de la nouvelle tâche
  const [newTask, setNewTask] = useState<string>('');
  // State pour stocker les détails de la tâche en cours d'édition
  const [editTask, setEditTask] = useState<Task | null>(null);
  // State pour contrôler l'ouverture/fermeture du modal d'édition
  const [openModal, setOpenModal] = useState<boolean>(false);
  // Nouvel état pour gérer l'affichage du message d'erreur (au niveau de l'ajout)
  const [error, setError] = useState<boolean>(false);

  // Chargement des tâches depuis le localStorage au chargement de l'application
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);


  // Mise à jour du localStorage à chaque modification de la liste de tâches
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  // Fonction pour ajouter une nouvelle tâche à la liste
  const addTask = (): void => {
    if (newTask.trim() !== '') {
      const newTaskItem: Task = { id: Date.now(), title: newTask, content: '', completed: false };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
      setError(false); // Réinitialise le message d'erreur lorsque le titre est ajouté
    } else {
      setError(true); // Affiche le message d'erreur si le titre est vide
    }
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
    <Container sx={{ display: "flex", height: "100vh", alignItems: "center",  }} maxWidth="sm">
      <Box p={4} sx={{ width: "100%", backgroundColor: "#fff", borderRadius: 3, boxShadow: "3px 3px 40px -1px rgba(70,82,157,0.23)" }}>

        {/* ---- Champ de texte pour ajouter une nouvelle tâche ---- */}
        <TextField
          label="Nouvelle tâche"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTask();
            }
          }}
          sx={{ marginBottom: '20px' }}
        />
        {/* Affiche le message d'erreur s'il y a une erreur */}
        {error &&
          <Typography sx={{ padding: "0 0 15px", color: 'red', fontSize: "13px" }}>
            Veuillez saisir un titre pour la tâche.
          </Typography>
        }
        {/* ---- Bouton pour ajouter une nouvelle tâche ---- */}
        <Button variant="contained" onClick={addTask} sx={{ width: '100%', maxWidth: '150px', borderRadius: 20, marginBottom: '20px', textTransform: "none", backgroundColor: "#5cc6cb" }}>
          Ajouter
        </Button>

        {/* ---- Affichage du nombre de tâches non terminées ---- */}
        <Box sx={{ px: 2, borderRadius: 1, backgroundColor: "#ecedf1" }}>

          <Typography variant="body2" sx={{ py: 1 }}>
            {tasks.filter(task => !task.completed).length} tâche(s) non terminée(s)
          </Typography>
          
          {tasks.filter(task => task.completed).length > 0 && (
            <Typography sx={{ py: 1 }}>
              {tasks.filter(task => task.completed).length} tâche(s) terminée(s)
            </Typography>
          )}
        </Box>

        {/* ---- Liste des tâches ---- */}
        <List sx={{ mt: 4 }}>
          {tasks.map(task => (
            <ListItem key={task.id} button sx={{ my: 1, backgroundColor: task.completed ? '#e0f2f1' : 'inherit', borderBottom: '1px solid #cad2db' }}>
              <ListItemText
                primary={task.title}
                secondary={`Détail: ${task.content}`}
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
              <ListItemSecondaryAction className='listIconTask'>
                <IconButton onClick={() => toggleComplete(task.id)}>
                  {task.completed ? <CheckBoxIcon sx={{ color: "#59677a", fontSize: "18px" }} /> : <CheckBoxOutlineBlankIcon sx={{ color: "#59677a", fontSize: "18px" }} />}
                </IconButton>
                <IconButton onClick={() => openEditModal(task)}>
                  <EditIcon sx={{ color: "#59677a", fontSize: "18px" }} />
                </IconButton>
                <IconButton onClick={() => deleteTask(task.id)}>
                  <DeleteIcon sx={{ color: "#f87d95", fontSize: "18px" }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {/* ---- Modal d'édition d'une tâche ---- */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
            <TextField
              label="Titre"
              variant="outlined"
              fullWidth
              value={editTask?.title || ''}
              onChange={e => setEditTask({ ...editTask!, title: e.target.value })}
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Détails de la tâche"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editTask?.content || ''}
              onChange={e => setEditTask({ ...editTask!, content: e.target.value })}
              sx={{ marginBottom: '20px' }}
            />
            <Button variant="contained" onClick={saveEditedTask} sx={{ width: '100%', maxWidth: '150px', borderRadius: 20, marginBottom: '20px', textTransform: "none", backgroundColor: "#5cc6cb" }}>
              Enregistrer
            </Button>
          </Box>
        </Modal>

      </Box>
    </Container>
  );
}


export default App;
