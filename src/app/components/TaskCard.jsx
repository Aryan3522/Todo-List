"use client";

import React from "react";

const TaskCard = ({ task, startTask, completeTask }) => {
  return (
    <div className="task-card p-3 mb-3">

      <div className="d-flex justify-content-between align-items-start">

        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            fontWeight: 500,
          }}
        >
          {task.title}
        </span>

        <span className="badge bg-light text-dark">
          {task.date}
        </span>

      </div>

      <div className="mt-3">

        {!task.inProgress && !task.completed && (
          <button
            className="btn btn-sm btn-warning"
            onClick={startTask}
          >
            Start
          </button>
        )}

        {task.inProgress && !task.completed && (
          <input
            type="checkbox"
            className="form-check-input"
            onChange={completeTask}
          />
        )}

      </div>

    </div>
  );
};

export default TaskCard;