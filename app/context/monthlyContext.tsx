"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";

// ---------------- TYPES ----------------

// Task type
export type MonthlyTask = {
  title?: string;
  description?: string;
  year: number;
  month: number;
  date: number;
  inProgress: boolean;
  completed: boolean;
};

// State type → key = month index (0–11)
export type MonthlyState = {
  [key: number]: MonthlyTask[];
};

// Action types
type AddPlanPayload = {
  title: string;
  date: number;
  month: number;
  year: number;
};

type Action =
  | { type: "ADD_PLAN"; payload: AddPlanPayload }
  | {
      type: "DELETE_PLAN";
      payload: { monthInd: number; taskInd: number };
    }
  | {
      type: "TASK_PROGRESS";
      payload: { month: number; index: number };
    }
  | {
      type: "MOVE_TO_TODO";
      payload: { month: number; index: number };
    }
  | {
      type: "TASK_COMPLETED";
      payload: { month: number; index: number };
    };

// Context type
type MonthlyContextType = {
  Planning: MonthlyState;
  dispatch: Dispatch<Action>;
  months: string[];
};

// ---------------- CONSTANTS ----------------

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ---------------- INITIAL STATE ----------------

let MonthlyPlanner: MonthlyState = {};

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("toDo230Monthly");
  if (stored) {
    MonthlyPlanner = JSON.parse(stored);
  }
}

// ---------------- CONTEXT ----------------

export const MonthlyContext = createContext<MonthlyContextType | null>(null);

// ---------------- REDUCER ----------------

function reducer(state: MonthlyState, action: Action): MonthlyState {
  switch (action.type) {
    // ADD PLAN
    case "ADD_PLAN": {
      const newState = { ...state };
      const month = Number(action.payload.month);

      const newTask: MonthlyTask = {
        ...action.payload,
        inProgress: false,
        completed: false,
      };

      if (newState[month]) {
        newState[month] = [...newState[month], newTask];
      } else {
        newState[month] = [newTask];
      }

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));
      return newState;
    }

    // DELETE PLAN
    case "DELETE_PLAN": {
      const { monthInd, taskInd } = action.payload;
      const newState = { ...state };

      const filtered = (newState[monthInd] || []).filter(
        (_, i) => i !== taskInd,
      );

      if (filtered.length > 0) {
        newState[monthInd] = filtered;
      } else {
        delete newState[monthInd];
      }

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));
      return newState;
    }

    // TASK IN PROGRESS
    case "TASK_PROGRESS": {
      const { month, index } = action.payload;

      const tasks = [...(state[month] || [])];

      tasks[index] = {
        ...tasks[index],
        inProgress: true,
        completed: false,
      };

      const newState = { ...state, [month]: tasks };

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));
      return newState;
    }

    // MOVE BACK TO TODO
    case "MOVE_TO_TODO": {
      const { month, index } = action.payload;

      const tasks = [...(state[month] || [])];

      tasks[index] = {
        ...tasks[index],
        inProgress: false,
        completed: false,
      };

      const newState = { ...state, [month]: tasks };

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));
      return newState;
    }

    // TASK COMPLETED
    case "TASK_COMPLETED": {
      const { month, index } = action.payload;

      const tasks = [...(state[month] || [])];

      tasks[index] = {
        ...tasks[index],
        completed: true,
        inProgress: false,
      };

      const newState = { ...state, [month]: tasks };

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
}

// ---------------- PROVIDER ----------------

type ProviderProps = {
  children: ReactNode;
};

export const MonthlyProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, MonthlyPlanner);

  return (
    <MonthlyContext.Provider value={{ Planning: state, dispatch, months }}>
      {children}
    </MonthlyContext.Provider>
  );
};
