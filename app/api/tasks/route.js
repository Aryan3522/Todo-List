import { connectToDatabase } from '../../../lib/mongodb';
import Task from '../../../models/Task';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find({});
  const formattedTasks = tasks.map(task => ({
    id: task._id.toString(),
    title: task.title,
    completed: task.completed
  }));
  return NextResponse.json(formattedTasks);
}