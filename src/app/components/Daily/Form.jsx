"use client";

import { DailyContext } from "@/app/context/context";
import React, { useContext, useState } from "react";

export const Form = () => {
  const { dispatch } = useContext(DailyContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (time) => {
    if (!title.trim()) return;

    const date = new Date();

    let payload = {
      title,
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

    dispatch({
      type: time === "today" ? "ADD_TASK_TODAY" : "ADD_TASK_TOMORROW",
      payload,
    });

    setTitle("");
  };

  return (
    <div className="container-fluid mb-4 d-flex justify-content-center">

      <div
        className="card shadow-sm border-0 w-100"
        style={{ maxWidth: "750px" }}
      >

        <div className="card-body">

          <h5 className="card-title mb-3 fw-semibold text-center">
            Add New Task
          </h5>

          {/* Input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2 d-sm-flex">

            <button
              className="btn btn-primary flex-fill"
              onClick={() => handleSubmit("today")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit("today")
                }
              }}
            >
              Add Today
            </button>

            <button
              className="btn btn-success flex-fill"
              onClick={() => handleSubmit("tomorrow")}
            >
              Tomorrow
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};