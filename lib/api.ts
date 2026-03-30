import { auth } from "@/lib/firebase";

async function getToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return user.getIdToken();
}

// FETCH TASKS
export async function getTasks() {
  const token = await getToken();

  const res = await fetch("/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// CREATE TASK
export async function createTask(title: string) {
  const token = await getToken();

  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
}