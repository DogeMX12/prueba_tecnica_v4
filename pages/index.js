import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const [refreshList, setRefreshList] = useState(false);

  const handleTaskAdded = () => {
    setRefreshList(prev => !prev);
  };


  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Gestor de Tareas
      </h1>
      
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList refreshList={refreshList} />
    </div>
  );
}
