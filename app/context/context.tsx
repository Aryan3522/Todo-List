"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// ---------------- TYPES ----------------

// Task type
export type Task = {
  title?: string;
  completed?: boolean;
  day: number;
  month: number;
  year: number;
};

// State type
export type State = {
  today: Task[];
  previous: Task[];
  tomorrow: Task[];
};

// Action types
type Action =
  | { type: "ADD_TASK_TODAY"; payload: Task }
  | { type: "ADD_TASK_TOMORROW"; payload: Task }
  | {
      type: "MOVE_TASK";
      payload: {
        from: keyof State;
        to: keyof State;
        index: number;
      };
    }
  | {
      type: "DELETE";
      payload: {
        comingFrom: keyof State;
        index: number;
      };
    }
  | {
      type: "TASK_COMPLETED";
      payload: {
        comingFrom: keyof State;
        index: number;
      };
    };

// Context type
type DailyContextType = {
  toDoArr: State;
  dispatch: Dispatch<Action>;
};

// ---------------- INITIAL STATE ----------------

let toDoArr: State = {
  today: [],
  previous: [],
  tomorrow: [],
};

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("toDo230");

  if (stored) {
    toDoArr = JSON.parse(stored);
  }

  const date = new Date();

  // ---------- TODAY LOGIC ----------
  if (toDoArr.today[0]) {
    if (
      toDoArr.today[0].year < date.getFullYear() ||
      toDoArr.today[0].month < date.getMonth() ||
      toDoArr.today[0].day < date.getDate()
    ) {
      const filtered = toDoArr.today.filter((t) => !t.completed);
      toDoArr.previous = [...toDoArr.previous, ...filtered];
      toDoArr.today = [];
    }
  }

  // ---------- TOMORROW LOGIC ----------
  if (toDoArr.tomorrow[0]) {
    if (toDoArr.tomorrow[0].day === date.getDate()) {
      toDoArr.today = toDoArr.tomorrow;
      toDoArr.tomorrow = [];
    } else if (
      toDoArr.tomorrow[0].year < date.getFullYear() ||
      toDoArr.tomorrow[0].month < date.getMonth() ||
      toDoArr.tomorrow[0].day < date.getDate()
    ) {
      toDoArr.previous = [...toDoArr.previous, ...toDoArr.tomorrow];
      toDoArr.tomorrow = [];
    }
  }

  localStorage.setItem("toDo230", JSON.stringify(toDoArr));
}

// ---------------- CONTEXT ----------------

export const DailyContext = createContext<DailyContextType | null>(null);

// ---------------- REDUCER ----------------

function reducer(state: State, action: Action): State {
  try {
    switch (action.type) {
      case "ADD_TASK_TODAY": {
        const newState = {
          ...state,
          today: [...state.today, action.payload],
        };
        localStorage.setItem("toDo230", JSON.stringify(newState));
        return newState;
      }

      case "ADD_TASK_TOMORROW": {
        const newState = {
          ...state,
          tomorrow: [...state.tomorrow, action.payload],
        };
        localStorage.setItem("toDo230", JSON.stringify(newState));
        return newState;
      }

      case "MOVE_TASK": {
        const { from, to, index } = action.payload;

        const fromArr = [...state[from]];
        const task = { ...fromArr[index] };

        fromArr.splice(index, 1);

        const date = new Date();

        if (to === "today") {
          task.day = date.getDate();
          task.month = date.getMonth();
          task.year = date.getFullYear();
        }

        if (to === "tomorrow") {
          const t = new Date();
          t.setDate(t.getDate() + 1);
          task.day = t.getDate();
          task.month = t.getMonth();
          task.year = t.getFullYear();
        }

        if (to === "previous") {
          const p = new Date();
          p.setDate(p.getDate() - 1);
          task.day = p.getDate();
          task.month = p.getMonth();
          task.year = p.getFullYear();
        }

        const updatedState = {
          ...state,
          [from]: fromArr,
          [to]: [...state[to], task],
        };

        localStorage.setItem("toDo230", JSON.stringify(updatedState));
        return updatedState;
      }

      case "DELETE": {
        const { comingFrom, index } = action.payload;

        const updated = state[comingFrom].filter((_, i) => i !== index);

        const newState = {
          ...state,
          [comingFrom]: updated,
        };

        localStorage.setItem("toDo230", JSON.stringify(newState));
        return newState;
      }

      case "TASK_COMPLETED": {
        const { comingFrom, index } = action.payload;

        const updated = [...state[comingFrom]];
        updated[index].completed = true;

        const newState = {
          ...state,
          [comingFrom]: updated,
        };

        localStorage.setItem("toDo230", JSON.stringify(newState));
        return newState;
      }

      default:
        return state;
    }
  } catch (error) {
    console.log(error);
    return state;
  }
}

// ---------------- PROVIDER ----------------

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, toDoArr);

  return (
    <DailyContext.Provider value={{ toDoArr: state, dispatch }}>
      {children}
    </DailyContext.Provider>
  );
};