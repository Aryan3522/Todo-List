"use client";
const { createContext, useReducer, useState } = require("react");

let toDoArr = {};
if (typeof window !== "undefined") {
  toDoArr = JSON.parse(localStorage.getItem("toDo230")) || {
    today: [],
    previous: [],
    tomorrow: [],
  };
  const date = new Date();
  if (toDoArr.today[0] !== undefined) {
    if (toDoArr.today[0].year < date.getFullYear()) {
      const prev = toDoArr.previous;
      let today = toDoArr.today;
      today = today.filter((ele) => {
        if (!ele.completed) return ele;
      });
      toDoArr.previous = [...prev, ...today];
      toDoArr.today = [];
    } else {
      if (toDoArr.today[0].month < date.getMonth()) {
        const prev = toDoArr.previous;
        let today = toDoArr.today;
        today = today.filter((ele) => {
          if (!ele.completed) return ele;
        });
        toDoArr.previous = [...prev, ...today];
        toDoArr.today = [];
      } else {
        if (toDoArr.today[0].day < date.getDate()) {
          const prev = toDoArr.previous;
          let today = toDoArr.today;
          today = today.filter((ele) => {
            if (!ele.completed) return ele;
          });
          toDoArr.previous = [...prev, ...today];
          toDoArr.today = [];
        }
      }
    }
  }

  if (toDoArr.tomorrow[0] !== undefined) {
    const date = new Date();
    if (toDoArr.tomorrow[0].day == date.getDate()) {
      toDoArr.today = toDoArr.tomorrow;
      toDoArr.tomorrow = [];
    } else if (toDoArr.tomorrow[0].year < date.getFullYear()) {
      if (toDoArr.tomorrow[0].month < date.getMonth()) {
        toDoArr.today = [];
        const prev = toDoArr.previous;
        toDoArr.previous = [...prev, ...toDoArr.tomorrow];
        toDoArr.tomorrow = [];
      } else {
        if (toDoArr.tomorrow[0].day < date.getDate()) {
          toDoArr.today = [];
          const prev = toDoArr.previous;
          toDoArr.previous = [...prev, ...toDoArr.tomorrow];
          toDoArr.tomorrow = [];
        }
      }
    }
  }
  localStorage.setItem("toDo230", JSON.stringify(toDoArr));
} else {
  toDoArr = { today: [], previous: [], tomorrow: [] };
}

export const DailyContext = createContext();

function reducer(state, action) {
  try {
    switch (action.type) {
      case "ADD_TASK_TODAY":
        const newState = { ...state, today: [...state.today, action.payload] };
        localStorage.setItem("toDo230", JSON.stringify(newState));
        return newState;
      case "ADD_TASK_TOMORROW":
        const newState1 = {
          ...state,
          tomorrow: [...state.tomorrow, action.payload],
        };
        localStorage.setItem("toDo230", JSON.stringify(newState1));
        return newState1;
      case "MOVE_TASK": {
        const { from, to, index } = action.payload;

        const newState = { ...state };

        const fromArr = [...newState[from]];
        const task = { ...fromArr[index] };

        // remove from original array
        fromArr.splice(index, 1);

        // update task date depending on destination
        const date = new Date();

        if (to === "today") {
          task.day = date.getDate();
          task.month = date.getMonth();
          task.year = date.getFullYear();
        }

        if (to === "tomorrow") {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);

          task.day = tomorrow.getDate();
          task.month = tomorrow.getMonth();
          task.year = tomorrow.getFullYear();
        }

        if (to === "previous") {
          const prev = new Date();
          prev.setDate(prev.getDate() - 1);

          task.day = prev.getDate();
          task.month = prev.getMonth();
          task.year = prev.getFullYear();
        }

        const toArr = [...newState[to], task];

        const updatedState = {
          ...newState,
          [from]: fromArr,
          [to]: toArr,
        };

        localStorage.setItem("toDo230", JSON.stringify(updatedState));

        return updatedState;
      }
      case "DELETE":
        let newState3 = state;
        if (action.payload.comingFrom == "previous") {
          let prev = state.previous;
          prev = prev.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState3 = { ...newState3, previous: prev };
        } else if (action.payload.comingFrom == "today") {
          let today = state.today;
          today = today.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState3 = { ...newState3, today: today };
        } else {
          let tomorrow = state.tomorrow;
          tomorrow = tomorrow.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState3 = { ...newState3, tomorrow: tomorrow };
        }
        localStorage.setItem("toDo230", JSON.stringify(newState3));
        return newState3;
      case "TASK_COMPLETED":
        let newState4 = state;

        if (action.payload.comingFrom == "previous") {
          const previous = state.previous;
          previous[action.payload.index].completed = true;
          newState4 = { ...newState4, previous: previous };
        } else if (action.payload.comingFrom == "today") {
          const today = state.today;
          today[action.payload.index].completed = true;
          newState4 = { ...newState4, today: today };
        } else if (action.payload.comingFrom == "tomorrow") {
          const tomorrow = state.tomorrow;
          tomorrow[action.payload.index].completed = true;
          newState4 = { ...newState4, tomorrow: tomorrow };
        }
        localStorage.setItem("toDo230", JSON.stringify(newState4));
        return newState4;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, toDoArr);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <DailyContext.Provider value={{ toDoArr: state, dispatch, searchQuery, setSearchQuery }}>
      {children}
    </DailyContext.Provider>
  );
};
