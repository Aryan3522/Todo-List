"use client";

import { MonthlyContext } from "@/app/context/monthlyContext";
import React, { useState, useRef, useContext } from "react";

export const Form = () => {
  const ref = useRef(null);
  const { dispatch } = useContext(MonthlyContext);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    month: "",
    year: "",
  });

  function handleSubmit() {
    if (!formData.title || !formData.date) return;

    dispatch({
      type: "ADD_PLAN",
      payload: formData,
    });

    ref.current.reset();
  }

  return (
    <div className="d-flex justify-content-center mb-4">

      <div
        className="card shadow-sm border-0 w-100"
        style={{ maxWidth: "650px" }}
      >

        <div className="card-body">

          <h5 className="card-title text-center mb-4 fw-semibold">
            Add Monthly Plan
          </h5>

          <form ref={ref} className="row g-3">

            {/* Title */}
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Enter event title..."
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            {/* Date */}
            <div className="col-12">
              <input
                type="date"
                className="form-control"
                min={new Date().toJSON().slice(0, 10)}
                onChange={(e) => {
                  const aux = e.target.value.split("-");
                  setFormData((prev) => ({
                    ...prev,
                    year: aux[0],
                    month: aux[1],
                    date: aux[2],
                  }));
                }}
              />
            </div>

            {/* Button */}
            <div className="col-12 d-grid">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Add Plan
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};