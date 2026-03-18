"use client";
import React, { useContext, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DailyContext } from "../../context/context";

export const Previous = () => {
  const { toDoArr, dispatch } = useContext(DailyContext);
  const today = new Date();
  const [activeMoveIndex, setActiveMoveIndex] = useState(null);

  const previousTasks = (toDoArr?.previous || []).filter((ele) => {
    return (
      ele.year < today.getFullYear() ||
      (ele.year === today.getFullYear() && ele.month < today.getMonth()) ||
      (ele.year === today.getFullYear() &&
        ele.month === today.getMonth() &&
        ele.day < today.getDate())
    );
  });
  const TaskCompleted = (i) => {
    dispatch({
      type: "TASK_COMPLETED",
      payload: {
        index: i,
        comingFrom: "previous",
      },
    })
  }
  const DeleteTask = (i) => {
    dispatch({
      type: "DELETE",
      payload: {
        index: i,
        comingFrom: "previous",
      },
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full">

      {/* Header */}

      <div className="px-4 py-3 border-b bg-[#EAD9B8] rounded-t-2xl">
        <h6 className="text-sm font-semibold text-[#6B4F2A]">
          Previous Tasks
        </h6>
      </div>

      {/* Body */}

      <div className="p-2">

        {previousTasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No previous tasks
          </p>
        ) : (
          <ul className="space-y-2">

            {previousTasks.map((ele, i) => (
              <li
                key={i}
                className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow transition relative"
              >

                {/* Task Row */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    {/* <input
                      type="checkbox"
                      className="w-4 h-4 accent-gray-600 cursor-pointer"
                      checked={ele.completed === true}
                      onChange={() => {
                        TaskCompleted(i)
                      }}
                    /> */}
                    <input
                      type="checkbox"
                      checked={ele.completed === true}
                      onChange={() => TaskCompleted(i)}
                      className="w-4 h-4 accent-green-500 cursor-pointer"
                    />

                    <span className={`text-sm font-medium ${ele.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                      }`}>
                      {ele.title}
                    </span>

                  </div>

                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {ele.day}/{ele.month + 1}/{ele.year}
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
                          className="text-xs px-2 py-1 bg-[#D7DDFF] text-[#3730A3] rounded hover:bg-[#C4CCFF] transition"
                          onClick={() => {
                            dispatch({
                              type: "MOVE_TASK",
                              payload: {
                                from: "previous",
                                to: "today",
                                index: i,
                              },
                            });
                            setActiveMoveIndex(null);
                          }}
                        >
                          Today
                        </button>

                        <button
                          className="text-xs px-2 py-1 bg-[#D1FAE5] text-[#047857] rounded hover:bg-[#B8F3D7] transition"
                          onClick={() => {
                            dispatch({
                              type: "MOVE_TASK",
                              payload: {
                                from: "previous",
                                to: "tomorrow",
                                index: i,
                              },
                            });
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
                    onClick={() => DeleteTask(i)}
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