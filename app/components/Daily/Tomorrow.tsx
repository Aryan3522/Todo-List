"use client";

import { useContext, useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DailyContext, Task } from "../../context/context";
import { SearchContext } from "../../context/SearchContext";

// ✅ Extend task for UI safety (optional but clean)
type TaskItem = Task;

export function Tomorrow() {
  const ctx = useContext(DailyContext);
  const searchCtx = useContext(SearchContext);
  const searchQuery = searchCtx?.searchQuery.toLowerCase() || "";

  // ✅ FIX 1: context safety
  if (!ctx) return null;

  const { toDoArr, dispatch } = ctx;

  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  // ✅ FIX 2: proper typing
  const [activeMoveIndex, setActiveMoveIndex] = useState<number | null>(null);

  const tomorrowTasks: TaskItem[] = today
    ? (toDoArr?.tomorrow || []).filter((ele) => {
        return (
          ele.year > today.getFullYear() ||
          (ele.year === today.getFullYear() && ele.month > today.getMonth()) ||
          (ele.year === today.getFullYear() &&
            ele.month === today.getMonth() &&
            ele.day > today.getDate())
        );
      })
    : [];

  const filteredTasks = searchQuery
    ? tomorrowTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery),
      )
    : tomorrowTasks;

  // ✅ FIX 3: typed handler
  const TaskCompleted = (i: number) => {
    dispatch({
      type: "TASK_COMPLETED",
      payload: {
        index: i,
        comingFrom: "tomorrow",
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-[#D1FAE5] rounded-t-lg">
        <h6 className="text-sm font-semibold text-[#047857]">Tomorrow Tasks</h6>
      </div>

      {/* Body */}
      <div className="p-2">
        {tomorrowTasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No upcoming tasks
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map((ele, i) => (
              <li
                key={i}
                className="bg-white border border-gray-100 rounded-md p-3 shadow-sm hover:shadow transition relative"
              >
                {/* Task Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={ele.completed === true}
                      onChange={() => TaskCompleted(i)}
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
                      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-sm shadow-md p-2 flex gap-2 z-50">
                        <button
                          className="text-xs px-2 py-1 bg-[#EAD9B8] text-[#6B4F2A] rounded hover:bg-[#E2CEA6]"
                          onClick={() => {
                            dispatch({
                              type: "MOVE_TASK",
                              payload: {
                                from: "tomorrow",
                                to: "previous",
                                index: i,
                              },
                            });
                            setActiveMoveIndex(null);
                          }}
                        >
                          Previous
                        </button>

                        <button
                          className="text-xs px-2 py-1 bg-[#D7DDFF] text-[#3730A3] rounded hover:bg-[#C4CCFF]"
                          onClick={() => {
                            dispatch({
                              type: "MOVE_TASK",
                              payload: {
                                from: "tomorrow",
                                to: "today",
                                index: i,
                              },
                            });
                            setActiveMoveIndex(null);
                          }}
                        >
                          Today
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    className="text-xs p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition"
                    onClick={() =>
                      dispatch({
                        type: "DELETE",
                        payload: {
                          index: i,
                          comingFrom: "tomorrow",
                        },
                      })
                    }
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
}
