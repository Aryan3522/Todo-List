import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextResponse, NextRequest } from "next/server";
import { getUserFromRequest } from "@/lib/getUserFromRequest";

type TaskResponse = {
  id: string;
  title: string;
  completed: boolean;
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<TaskResponse[] | { error: string }>> {
  try {
    await connectToDatabase();

    const userId = await getUserFromRequest(req);
    const tasks = await Task.find({ userId });

    const formattedTasks: TaskResponse[] = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      completed: task.completed,
    }));

    return NextResponse.json(formattedTasks);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const userId = await getUserFromRequest(req);
    const body = await req.json();

    const newTask = await Task.create({
      title: body.title,
      userId,
    });

    return NextResponse.json(newTask);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

