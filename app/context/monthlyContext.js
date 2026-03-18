"use client";
const { createContext, useReducer } = require("react");

const months = [
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

let MonthlyPlanner = {};
if (typeof window !== "undefined") {
  MonthlyPlanner = JSON.parse(localStorage.getItem("toDo230Monthly")) || {};
}

export const MonthlyContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    /* ADD PLAN */

    case "ADD_PLAN": {
      const newState = { ...state };
      const month = parseInt(action.payload.month);

      const newTask = {
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

    /* DELETE PLAN */

    case "DELETE_PLAN": {
      const newState = { ...state };

      const temp = newState[action.payload.monthInd].filter((ele, i) => {
        return action.payload.taskInd !== i;
      });

      if (temp.length > 0) newState[action.payload.monthInd] = temp;
      else delete newState[action.payload.monthInd];

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));
      return newState;
    }

    /* MOVE TASK TO IN PROGRESS */

    case "TASK_PROGRESS": {
      const { month, index } = action.payload;
      const newState = { ...state };

      const monthTasks = [...(newState[month] || [])];

      monthTasks[index] = {
        ...monthTasks[index],
        inProgress: true,
        completed: false,
      };

      newState[month] = monthTasks;

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));

      return newState;
    }

    // Stop progress
    case "MOVE_TO_TODO": {
      const { month, index } = action.payload;

      const newState = { ...state };

      const monthTasks = [...(newState[month] || [])];

      monthTasks[index] = {
        ...monthTasks[index],
        inProgress: false,
        completed: false,
      };

      newState[month] = monthTasks;

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));

      return newState;
    }

    /* COMPLETE TASK */

    case "TASK_COMPLETED": {
      const { month, index } = action.payload;
      const newState = { ...state };

      const monthTasks = [...(newState[month] || [])];

      monthTasks[index] = {
        ...monthTasks[index],
        completed: true,
        inProgress: false,
      };

      newState[month] = monthTasks;

      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));

      return newState;
    }

    default:
      return state;
  }
}

export const MonthlyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, MonthlyPlanner);

  return (
    <MonthlyContext.Provider value={{ Planning: state, dispatch, months }}>
      {children}
    </MonthlyContext.Provider>
  );
};
