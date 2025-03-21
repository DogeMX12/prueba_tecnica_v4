import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ refreshList }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      } else {
        alert('Error al cargar las tareas');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión con el servidor');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshList]);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  return (
    <div className="max-w-lg mx-auto">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-700">No hay tareas disponibles.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        ))
      )}
    </div>
  );
}
