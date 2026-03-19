"use client";

import { DailyContext } from "@/app/context/context";
import React, { useContext, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const Today = () => {
  const { toDoArr, moveTask, deleteTask, completeTask } =
    useContext(DailyContext);

  const today = new Date();
  const [activeMoveIndex, setActiveMoveIndex] = useState(null);

  const todayTasks = (toDoArr?.today || []).filter((ele) => {
    const taskDate = new Date(ele.date);

    return (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    );
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full">

      {/* Header */}
      <div className="px-4 py-3 border-b bg-[#D7DDFF] rounded-t-2xl">
        <h6 className="text-sm font-semibold text-blue-700">
          Today's Tasks
        </h6>
      </div>

      {/* Body */}
      <div className="p-2">

        {todayTasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No tasks for today
          </p>
        ) : (
          <ul className="space-y-2">

            {todayTasks.map((ele, i) => (
              <li
                key={ele._id}   // 🔥 use _id
                className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow transition relative"
              >

                {/* Task Row */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={ele.completed === true}
                      onChange={() => completeTask(ele._id)}
                      className="w-4 h-4 accent-green-500 cursor-pointer"
                    />

                    <span
                      className={`text-sm font-medium ${
                        ele.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {ele.title}
                    </span>

                  </div>

                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {new Date(ele.date).toLocaleDateString()}
                  </span>

                </div>

                {/* Buttons */}
                <div className="flex gap-2 justify-between mt-3">

                  <div className="relative">

                    <button
                      className="text-xs px-3 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      onClick={() =>
                        setActiveMoveIndex(activeMoveIndex === i ? null : i)
                      }
                    >
                      Move
                    </button>

                    {activeMoveIndex === i && (
                      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-2 flex gap-2 z-50">

                        <button
                          className="text-xs px-2 py-1 bg-[#EAD9B8] text-[#6B4F2A] rounded hover:bg-[#E2CEA6] transition"
                          onClick={() => {
                            moveTask(ele._id, "previous");
                            setActiveMoveIndex(null);
                          }}
                        >
                          Previous
                        </button>

                        <button
                          className="text-xs px-2 py-1 bg-[#D1FAE5] text-[#047857] rounded hover:bg-[#B8F3D7] transition"
                          onClick={() => {
                            moveTask(ele._id, "tomorrow");
                            setActiveMoveIndex(null);
                          }}
                        >
                          Tomorrow
                        </button>

                      </div>
                    )}

                  </div>

                  <button
                    className="text-xs p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition"
                    onClick={() => deleteTask(ele._id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>

                </div>

              </li>
            ))}

          </ul>
        )}

      </div>
    </div>
  );
};