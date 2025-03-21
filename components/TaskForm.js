import { useState } from 'react';

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setDescription('');
        setDueDate('');
        onTaskAdded();
      } else {
        alert(data.error || 'Error al agregar la tarea');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agregar Nueva Tarea</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Título</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa el título de la tarea"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripción</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingresa una descripción de la tarea"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fecha Límite</label>
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
        Agregar Tarea
      </button>
    </form>
  );
}
