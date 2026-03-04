"use client";

import { MonthlyContext } from "@/app/context/monthlyContext";
import React, { useContext } from "react";

const monthColors = {
  1: { bg: "#F9F3E6", text: "#6B4F2A" }, // Jan - beige
  2: { bg: "#EEF1FF", text: "#3730A3" }, // Feb - soft blue
  3: { bg: "#ECFDF5", text: "#047857" }, // Mar - mint green
  4: { bg: "#FDF2F8", text: "#BE185D" }, // Apr - pink
  5: { bg: "#FFF7ED", text: "#9A3412" }, // May - peach
  6: { bg: "#F0F9FF", text: "#075985" }, // Jun - sky
  7: { bg: "#F5F3FF", text: "#5B21B6" }, // Jul - purple
  8: { bg: "#F0FDF4", text: "#166534" }, // Aug - green
  9: { bg: "#FEFCE8", text: "#854D0E" }, // Sep - yellow
  10: { bg: "#FFF1F2", text: "#9F1239" }, // Oct - rose
  11: { bg: "#F8FAFC", text: "#334155" }, // Nov - slate
  12: { bg: "#FDF4FF", text: "#86198F" }, // Dec - violet
};
export const Cards = () => {
  const { Planning, months, dispatch } = useContext(MonthlyContext);

  const CompleteTask = () => {
    dispatch({
      type: "TASK_COMPLETED",
      payload: { monthInd, taskInd },
    })
  }
  const deleteHandler = (monthInd, taskInd) => {
    dispatch({
      type: "DELETE_PLAN",
      payload: { monthInd, taskInd },
    });
  }

  const hasPlans = Object.values(Planning || {}).some(
    (month) => month && month.length > 0
  );

  if (!hasPlans) {
    return (
      <div className="text-center text-gray-400 py-10 text-sm">
        No monthly plans added yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {months.map((month, i) => {
        if (!Planning[i + 1]) return null;
        const theme = monthColors[i + 1];
        return (
          <div
            key={i}
            className="flex flex-col overflow-hidden"
          >

            {/* Month Header */}

            <div className="rounded-t-md px-4 py-3 border-b" style={{ backgroundColor: theme.bg }}>
              <h3 className="text-sm font-semibold" style={{ color: theme.text }}>
                {month}
              </h3>
            </div>

            {/* Task List */}

            <div className="flex flex-col divide-y">

              {Planning[i + 1].map((plan, ind) => (
                <div
                  key={ind}
                  className="flex justify-between rounded-b-md bg-white items-center px-4 py-3 hover:bg-gray-50 transition"
                >
                  {/* Task Info */}

                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={plan.completed === true}
                      onChange={() =>
                        dispatch({
                          type: "TASK_COMPLETED",
                          payload: {
                            month: i + 1,
                            index: ind,
                          },
                        })
                      }
                      className="w-4 h-4 accent-green-500 cursor-pointer"
                    />

                    <div className="flex flex-col">

                      <span
                        className={`text-sm font-medium ${plan.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                          }`}
                      >
                        {plan.title}
                      </span>

                      <span className="text-xs text-gray-500">
                        {new Date(
                          plan.year,
                          plan.month - 1,
                          plan.date
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                    </div>

                  </div>

                  {/* Delete Button */}

                  <button
                    onClick={() => deleteHandler(i + 1, ind)}
                    className="text-xs px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>

          </div>
        );
      })}

    </div>
  );
};