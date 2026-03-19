"use client";

import { MonthlyContext } from "@/app/context/monthlyContext";
import React, { useContext } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const monthColors = {
  1: { bg: "#F9F3E6", text: "#6B4F2A" },
  2: { bg: "#EEF1FF", text: "#3730A3" },
  3: { bg: "#ECFDF5", text: "#047857" },
  4: { bg: "#FDF2F8", text: "#BE185D" },
  5: { bg: "#FFF7ED", text: "#9A3412" },
  6: { bg: "#F0F9FF", text: "#075985" },
  7: { bg: "#F5F3FF", text: "#5B21B6" },
  8: { bg: "#F0FDF4", text: "#166534" },
  9: { bg: "#FEFCE8", text: "#854D0E" },
  10: { bg: "#FFF1F2", text: "#9F1239" },
  11: { bg: "#F8FAFC", text: "#334155" },
  12: { bg: "#FDF4FF", text: "#86198F" },
};

export const Cards = () => {
  // 🔥 use backend functions instead of dispatch
  const {
    Planning,
    months,
    deletePlan,
    completeTask,
  } = useContext(MonthlyContext);

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
        // backend stores 0–11
        if (!Planning[i]) return null;

        const theme = monthColors[i + 1];

        return (
          <div key={i} className="flex flex-col overflow-hidden">

            {/* Month Header */}
            <div
              className="rounded-t-md px-4 py-3 border-b"
              style={{ backgroundColor: theme.bg }}
            >
              <h3
                className="text-sm font-semibold"
                style={{ color: theme.text }}
              >
                {month}
              </h3>
            </div>

            {/* Task List */}
            <div className="flex flex-col divide-y">

              {Planning[i].map((plan) => (
                <div
                  key={plan._id}   // 🔥 use _id
                  className="flex justify-between rounded-b-md bg-white items-center px-4 py-3 hover:bg-gray-50 transition"
                >

                  {/* Task Info */}
                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={plan.completed === true}
                      onChange={() => completeTask(plan._id)}
                      className="w-4 h-4 accent-green-500 cursor-pointer"
                    />

                    <div className="flex flex-col">

                      <span
                        className={`text-sm font-medium ${
                          plan.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {plan.title}
                      </span>

                      <span className="text-xs text-gray-500">
                        {new Date(plan.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>

                    </div>

                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deletePlan(plan._id)}
                    className="text-xs p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <DeleteOutlineIcon fontSize="small" />
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