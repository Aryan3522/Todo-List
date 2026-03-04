"use client";

import React from "react";
import TaskCard from "./TaskCard";

const BoardColumn = ({ title, tasks, color, startTask, completeTask }) => {
  return (
    <div className="col-lg-4">

      <div
        className="kanban-column p-3"
        style={{ background: color }}
      >

        <h6 className="fw-bold mb-3">{title}</h6>

        {tasks.map((task, i) => (
          <TaskCard
            key={i}
            task={task}
            startTask={() => startTask(task)}
            completeTask={() => completeTask(task)}
          />
        ))}

      </div>

    </div>
  );
};

export default BoardColumn;