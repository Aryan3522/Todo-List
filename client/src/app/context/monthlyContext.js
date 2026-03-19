"use client";
import { createContext, useReducer, useEffect } from "react";

export const MonthlyContext = createContext();

const API = "http://localhost:5000/api/monthly";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PLANS":
      return action.payload;

    default:
      return state;
  }
}

export const MonthlyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 🔥 Fetch all plans
  const fetchPlans = async () => {
    const res = await fetch(API);
    const data = await res.json();
    dispatch({ type: "SET_PLANS", payload: data });
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ✅ ADD PLAN
  const addPlan = async (title, month) => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, month }),
    });

    fetchPlans();
  };

  // ✅ DELETE PLAN
  const deletePlan = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchPlans();
  };

  // ✅ SET IN PROGRESS
  const setProgress = async (id) => {
    await fetch(`${API}/${id}/progress`, {
      method: "PATCH",
    });

    fetchPlans();
  };

  // ✅ MOVE BACK TO TODO
  const moveToTodo = async (id) => {
    await fetch(`${API}/${id}/todo`, {
      method: "PATCH",
    });

    fetchPlans();
  };

  // ✅ COMPLETE TASK
  const completeTask = async (id) => {
    await fetch(`${API}/${id}/complete`, {
      method: "PATCH",
    });

    fetchPlans();
  };

  return (
    <MonthlyContext.Provider
      value={{
        Planning: state,
        months,
        addPlan,
        deletePlan,
        setProgress,
        moveToTodo,
        completeTask,
      }}
    >
      {children}
    </MonthlyContext.Provider>
  );
};