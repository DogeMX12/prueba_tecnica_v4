import dbConnect from '../../../lib/dbConnect';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { method, query: { id } } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const task = await Task.findById(id);
        if (!task) {
          return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const { title, description, dueDate, completed } = req.body;
        // Si se envía título, se valida que no esté vacío
        if (title && title.trim() === '') {
          return res.status(400).json({ success: false, error: 'El título es obligatorio' });
        }
        const task = await Task.findByIdAndUpdate(
          id,
          { title, description, dueDate, completed },
          { new: true, runValidators: true }
        );
        if (!task) {
          return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedTask = await Task.deleteOne({ _id: id });
        if (!deletedTask.deletedCount) {
          return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
