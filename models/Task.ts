import mongoose, { Schema, model, models, Model } from "mongoose";

export interface ITask {
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ KEY FIX: explicit Model type
const Task: Model<ITask> =
  models.Task || model<ITask>("Task", TaskSchema);

export default Task;