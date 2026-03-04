"use client";

import React, { useState } from "react";
import BoardColumn from "./BoardColumn";

const HomePage = () => {

  const [tasks, setTasks] = useState([
    { title: "Restaurant Case", date: "June 10", inProgress: false, completed: false },
    { title: "Banking App Mobile", date: "June 16", inProgress: false, completed: false },
    { title: "Banking Landing", date: "June 18", inProgress: false, completed: false },
    { title: "Health Care Shot", date: "June 8", inProgress: true, completed: false },
    { title: "Mercedes Case", date: "June 10", inProgress: true, completed: false },
    { title: "Logofolio #2", date: "June 4", inProgress: false, completed: true },
  ]);

  const startTask = (task) => {
    setTasks(
      tasks.map((t) =>
        t === task ? { ...t, inProgress: true } : t
      )
    );
  };

  const completeTask = (task) => {
    setTasks(
      tasks.map((t) =>
        t === task ? { ...t, completed: true } : t
      )
    );
  };

  const todo = tasks.filter((t) => !t.inProgress && !t.completed);
  const progress = tasks.filter((t) => t.inProgress && !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div className="container-fluid p-4">

      <div className="row g-4">

        <BoardColumn
          title="To Do"
          tasks={todo}
          color="#f7f1e3"
          startTask={startTask}
          completeTask={completeTask}
        />

        <BoardColumn
          title="In Progress"
          tasks={progress}
          color="#e8ecff"
          startTask={startTask}
          completeTask={completeTask}
        />

        <BoardColumn
          title="Completed"
          tasks={completed}
          color="#f8e9ef"
          startTask={startTask}
          completeTask={completeTask}
        />

      </div>

    </div>
  );
};

export default HomePage;