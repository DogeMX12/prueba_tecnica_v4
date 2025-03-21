import { useState } from 'react';

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');

  const toggleComplete = async () => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const data = await res.json();
      if (data.success) {
        onTaskUpdated(data.data);
      } else {
        alert(data.error || 'Error al actualizar la tarea');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión con el servidor');
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        onTaskDeleted(task._id);
      } else {
        alert(data.error || 'Error al eliminar la tarea');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión con el servidor');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          dueDate: editedDueDate,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onTaskUpdated(data.data);
        setIsEditing(false);
      } else {
        alert(data.error || 'Error al editar la tarea');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión con el servidor');
    }
  };

  return (
    <div className={`p-4 rounded shadow mb-4 ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
          {task.description && <p className="text-gray-700 mb-2">{task.description}</p>}
          {task.dueDate && (
            <p className="text-sm text-gray-600 mb-2">
              Fecha Límite: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={toggleComplete}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2 text-gray-700">Completada</span>
            </label>
          </div>
        </>
      )}
    </div>
  );
}
