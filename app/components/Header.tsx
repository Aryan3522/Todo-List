"use client";

import { useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
import { MonthlyContext } from "../context/monthlyContext";
import { DailyContext } from "../context/context";

// ✅ Props
type HeaderProps = {
  sideBarOpen: boolean;
};

// ✅ Form Type
type FormData = {
  title: string;
  date: number;
  month: number;
  year: number;
};

export default function Header({ sideBarOpen }: HeaderProps) {
  const today = new Date();
  const pathname = usePathname();

  const monthlyCtx = useContext(MonthlyContext);
  const dailyCtx = useContext(DailyContext);

  // ✅ Safe context usage
  if (!monthlyCtx || !dailyCtx) {
    throw new Error("Context not found");
  }

  const { dispatch: monthlyDispatch } = monthlyCtx;
  const { dispatch: dailyDispatch } = dailyCtx;

  const [open, setOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    date: 0,
    month: 0,
    year: 0,
  });

  const isMonthly = pathname === "/" || pathname.startsWith("/monthly");

  // ---------------- HANDLERS ----------------

  const handleSubmit = () => {
    if (!formData.title || !formData.date) return;

    monthlyDispatch({
      type: "ADD_PLAN",
      payload: {
        ...formData,
        month: Number(formData.month),
      },
    });

    setFormData({
      title: "",
      date: 0,
      month: 0,
      year: 0,
    });

    setOpen(false);
  };

  const handleDailySubmit = (time: "today" | "tomorrow") => {
    if (!formData.title) return;

    const date = new Date();

    let payload = {
      title: formData.title,
      completed: false,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    if (time === "tomorrow") {
      date.setDate(date.getDate() + 1);

      payload = {
        ...payload,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    }

    dailyDispatch({
      type: time === "today" ? "ADD_TASK_TODAY" : "ADD_TASK_TOMORROW",
      payload,
    });

    setFormData({
      title: "",
      date: 0,
      month: 0,
      year: 0,
    });

    setOpen(false);
  };

  // ---------------- UI ----------------

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between min-h-16 px-6 z-40 transition-all duration-300 ${
          sideBarOpen ? "left-64" : "left-20"
        }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {today.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition">
            <SearchIcon fontSize="small" />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            + Add Task
          </button>
        </div>
      </header>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                {isMonthly ? "Add Monthly Task" : "Add Daily Task"}
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>

            {/* FORM */}
            {isMonthly ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter task title..."
                  value={formData.title}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />

                <input
                  type="date"
                  min={new Date().toJSON().slice(0, 10)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  onChange={(e) => {
                    const aux = e.target.value.split("-");

                    setFormData((prev) => ({
                      ...prev,
                      date: Number(aux[2]),
                      month: Number(aux[1]),
                      year: Number(aux[0]),
                    }));
                  }}
                />

                <button
                  disabled={!(formData.title && formData.date)}
                  onClick={handleSubmit}
                  className="w-full bg-green-500 text-white py-2 rounded-lg"
                >
                  Add Task
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter task title..."
                  value={formData.title}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />

                <div className="flex gap-2">
                  <button
                    className="w-1/2 bg-green-500 text-white py-2 rounded-lg"
                    disabled={!formData.title}
                    onClick={() => handleDailySubmit("today")}
                  >
                    Today
                  </button>

                  <button
                    className="w-1/2 bg-white border border-gray-300 py-2 rounded-lg"
                    disabled={!formData.title}
                    onClick={() => handleDailySubmit("tomorrow")}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
