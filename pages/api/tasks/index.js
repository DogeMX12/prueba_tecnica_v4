import dbConnect from '../../../lib/dbConnect';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener las tareas' });
      }
      break;
    case 'POST':
      try {
        const { title, description, dueDate } = req.body;
        // Validación básica: el título es obligatorio
        if (!title || title.trim() === '') {
          return res.status(400).json({ success: false, error: 'El título es obligatorio' });
        }
        const task = await Task.create({ title, description, dueDate });
        res.status(201).json({ success: true, data: task });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
