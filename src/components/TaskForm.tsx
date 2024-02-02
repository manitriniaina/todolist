import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface TaskFormProps {
  addTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Box>
      <TextField
        label="Nouvelle tâche"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
          }
        }}
        sx={{ marginBottom: '20px' }}
      />
      {error && (
        <Typography sx={{ padding: '0 0 15px', color: 'red', fontSize: '13px' }}>
          Veuillez saisir un titre pour la tâche.
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleAddTask}
        sx={{
          width: '100%',
          maxWidth: '150px',
          borderRadius: 20,
          marginBottom: '20px',
          textTransform: 'none',
          backgroundColor: '#5cc6cb',
        }}
      >
        Ajouter
      </Button>
    </Box>
  );
};

export default TaskForm;
