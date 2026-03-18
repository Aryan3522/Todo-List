import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// Response type
type TaskResponse = {
  id: string;
  title: string;
  completed: boolean;
};

export async function GET(): Promise<NextResponse<TaskResponse[]>> {
  await connectToDatabase();

  const tasks = await Task.find({});

  const formattedTasks: TaskResponse[] = tasks.map((task) => ({
    id: task._id.toString(),
    title: task.title,
    completed: task.completed,
  }));

  return NextResponse.json(formattedTasks);
}