import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Para evitar recompilar el modelo en desarrollo:
export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
