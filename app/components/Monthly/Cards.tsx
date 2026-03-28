"use client";

import { useContext } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { MonthlyContext } from "../../context/monthlyContext";
import { SearchContext } from "../../context/SearchContext";

// Month theme type
type MonthTheme = {
  bg: string;
  text: string;
};

// Typed month colors
const monthColors: Record<number, MonthTheme> = {
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

export function Cards() {
  const ctx = useContext(MonthlyContext);
  const searchCtx = useContext(SearchContext);
  const searchQuery = searchCtx?.searchQuery.toLowerCase() || "";

  if (!ctx) {
    throw new Error("MonthlyContext not found");
  }

  const { Planning, months, dispatch } = ctx;

  // ✅ delete handler typed
  const deleteHandler = (monthInd: number, taskInd: number) => {
    dispatch({
      type: "DELETE_PLAN",
      payload: { monthInd, taskInd },
    });
  };

  const hasPlans = Object.values(Planning || {}).some(
    (month) => month && month.length > 0,
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
        const monthIndex = i + 1;

        if (!Planning[monthIndex]) return null;

        const theme = monthColors[monthIndex];

        return (
          <div key={monthIndex} className="flex flex-col overflow-hidden">
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
              {Planning[monthIndex]
                .filter((plan) =>
                  plan.title.toLowerCase().includes(searchQuery),
                )
                .map((plan, ind) => (
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
                              month: monthIndex,
                              index: ind,
                            },
                          })
                        }
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
                          {new Date(
                            Number(plan.year),
                            Number(plan.month) - 1,
                            Number(plan.date),
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
                      onClick={() => deleteHandler(monthIndex, ind)}
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
}
