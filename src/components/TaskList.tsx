import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  openEditModal: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, openEditModal, deleteTask }) => (
    <List>
        {tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                openEditModal={openEditModal}
                deleteTask={deleteTask}
            />
        ))}
    </List>
);

export default TaskList;
