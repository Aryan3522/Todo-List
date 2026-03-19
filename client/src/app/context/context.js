"use client";
import { createContext, useReducer, useEffect } from "react";

export const DailyContext = createContext();

const API = "http://localhost:5000/api/tasks";

const initialState = {
  today: [],
  tomorrow: [],
  previous: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;

    case "ADD_TASK":
      return action.payload;

    case "MOVE_TASK":
      return action.payload;

    case "DELETE_TASK":
      return action.payload;

    case "COMPLETE_TASK":
      return action.payload;

    default:
      return state;
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 🔥 Fetch all tasks initially
  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    dispatch({ type: "SET_TASKS", payload: data });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ ADD TASK
  const addTask = async (title, category) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category }),
    });

    fetchTasks();
  };

  // ✅ MOVE TASK
  const moveTask = async (id, category) => {
    await fetch(`${API}/${id}/move`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    fetchTasks();
  };

  // ✅ DELETE
  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  // ✅ COMPLETE
  const completeTask = async (id) => {
    await fetch(`${API}/${id}/complete`, {
      method: "PATCH",
    });

    fetchTasks();
  };

  return (
    <DailyContext.Provider
      value={{
        toDoArr: state,
        dispatch, // optional now
        addTask,
        moveTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </DailyContext.Provider>
  );
};