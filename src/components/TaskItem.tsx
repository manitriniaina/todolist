import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: number) => void;
  openEditModal: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, openEditModal, deleteTask }) => (
  <ListItem key={task.id} button sx={{ my: 1, backgroundColor: task.completed ? '#e0f2f1' : 'inherit', borderBottom: '1px solid #cad2db' }}>
    <ListItemText
        primary={task.title}
        secondary={
            <Typography sx={{ maxWidth: '75%' }}>
                Détail: {task.content}
            </Typography>
        }
        sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
    />
    <ListItemSecondaryAction className="listIconTask">
      <IconButton onClick={() => toggleComplete(task.id)}>
        {task.completed ? <CheckBoxIcon sx={{ color: '#59677a', fontSize: '18px' }} /> : <CheckBoxOutlineBlankIcon sx={{ color: '#59677a', fontSize: '18px' }} />}
      </IconButton>
      <IconButton onClick={() => openEditModal(task)}>
        <EditIcon sx={{ color: '#59677a', fontSize: '18px' }} />
      </IconButton>
      <IconButton onClick={() => deleteTask(task.id)}>
        <DeleteIcon sx={{ color: '#f87d95', fontSize: '18px' }} />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default TaskItem;
