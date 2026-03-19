"use client";

import React, { useContext, useEffect, useState } from "react";
import { MonthlyContext } from "@/app/context/monthlyContext";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const columnStyles = {
  todo: "bg-[#f6eddc]",
  progress: "bg-[#ececff]",
  completed: "bg-[#f8e7ef]",
};

const Main = () => {
  const {
    Planning,
    setProgress,
    moveToTodo,
    completeTask,
    deletePlan,
  } = useContext(MonthlyContext);

  const [currentMonth, setCurrentMonth] = useState(null);

  useEffect(() => {
    // backend uses 0–11
    setCurrentMonth(new Date().getMonth());
  }, []);

  if (currentMonth === null) return null;

  const upcomingMonths = Object.keys(Planning || {})
    .map(Number)
    .filter((m) => m >= currentMonth && Planning[m]?.length)
    .sort((a, b) => a - b);

  const todos = [];
  const progress = [];
  const completed = [];

  upcomingMonths.forEach((month) => {
    Planning[month].forEach((task) => {
      const item = { ...task, month };

      if (task.completed) completed.push(item);
      else if (task.inProgress) progress.push(item);
      else todos.push(item);
    });
  });

  const renderCard = (task, type) => (
    <div
      key={task._id}   // 🔥 use _id
      className="rounded-xl shadow-sm border border-gray-100 min-w-52 p-4 flex flex-col gap-3 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-2 justify-center items-center">
          <h4
            className={`text-md font-semibold ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </h4>

          {type === "completed" && (
            <div className="flex justify-center align-middle items-center">
              <CheckIcon className="text-green-600" />
            </div>
          )}
        </div>

        <span className="text-[14px] text-green-800">
          {new Date(task.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="flex justify-between items-center">

        <div className="flex gap-2">

          {type === "todo" && (
            <button
              onClick={() => setProgress(task._id)}
              className="px-3 py-1 text-xs font-medium rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
            >
              Start
            </button>
          )}

          {type === "progress" && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => moveToTodo(task._id)}
                className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Later?
              </button>

              <button
                onClick={() => completeTask(task._id)}
                className="px-3 py-1 text-xs font-medium rounded-md bg-green-50 text-green-600 hover:bg-green-100"
              >
                Complete
              </button>
            </div>
          )}

        </div>

        <button
          onClick={() => deletePlan(task._id)}
          className="p-1 text-xs font-medium rounded-md bg-red-50 text-red-600 hover:bg-red-100"
        >
          <DeleteOutlineIcon fontSize="small" />
        </button>

      </div>
    </div>
  );

  return (
    <div className="w-full py-4">

      {/* Board Container */}
      <div className="w-full flex flex-wrap gap-6">

        {/* TODO */}
        <div className={`flex-1 rounded-2xl p-6 ${columnStyles.todo}`}>
          <h3 className="text-sm font-semibold text-yellow-700 mb-5">
            To Do
          </h3>

          <div className="flex flex-col gap-4">
            {todos.length
              ? todos.map((task) => renderCard(task, "todo"))
              : <p className="text-xs text-gray-500">No tasks</p>}
          </div>
        </div>

        {/* IN PROGRESS */}
        <div className={`flex-1 rounded-2xl p-6 ${columnStyles.progress}`}>
          <h3 className="text-sm font-semibold text-indigo-600 mb-5">
            In Progress
          </h3>

          <div className="flex flex-col gap-4">
            {progress.length
              ? progress.map((task) => renderCard(task, "progress"))
              : <p className="text-xs text-gray-500">No tasks</p>}
          </div>
        </div>

        {/* COMPLETED */}
        <div className={`flex-1 rounded-2xl p-6 ${columnStyles.completed}`}>
          <h3 className="text-sm font-semibold text-pink-600 mb-5">
            Completed
          </h3>

          <div className="flex flex-col gap-4">
            {completed.length
              ? completed.map((task) => renderCard(task, "completed"))
              : <p className="text-xs text-gray-500">No tasks</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Main;