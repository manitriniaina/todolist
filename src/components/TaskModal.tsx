import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  editTask: Task | null;
  saveEditedTask: () => void;
  setEditTask: (task: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, editTask, saveEditedTask, setEditTask }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
      <TextField
        label="Titre"
        variant="outlined"
        fullWidth
        value={editTask?.title || ''}
        onChange={(e) => setEditTask({ ...editTask!, title: e.target.value })}
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        label="Détails de la tâche"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={editTask?.content || ''}
        onChange={(e) => setEditTask({ ...editTask!, content: e.target.value })}
        sx={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        onClick={saveEditedTask}
        sx={{
          width: '100%',
          maxWidth: '150px',
          borderRadius: 20,
          marginBottom: '20px',
          textTransform: 'none',
          backgroundColor: '#5cc6cb',
        }}
      >
        Enregistrer
      </Button>
    </Box>
  </Modal>
);

export default TaskModal;
