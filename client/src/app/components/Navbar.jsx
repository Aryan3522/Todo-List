"use client";

import React, { useState, useEffect } from "react";
import { Home, CalendarDays, CheckSquare } from "lucide-react";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Navbar = ({ open, setOpen }) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // 🔥 Toggle sidebar (no localStorage)
  const handleSidebarOpen = () => {
    setOpen(!open);
  };

  // ⏱ Timer logic (unchanged)
  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running]);

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Timer */}
      <div
        className={`relative flex items-center border-b border-gray-200 min-h-16 ${
          open ? "justify-between px-4" : "justify-center"
        }`}
      >
        {/* Timer */}
        {open && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRunning(!running)}
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition"
            >
              {running ? (
                <PauseIcon fontSize="small" />
              ) : (
                <PlayArrowIcon fontSize="small" />
              )}
            </button>

            <span className="text-sm font-semibold text-gray-700">
              {formatTime()}
            </span>
          </div>
        )}

        {/* Chevron Toggle */}
        <button
          onClick={handleSidebarOpen}
          className={`absolute text-gray-500 hover:text-black ${
            open ? "right-4" : "right-1/2 translate-x-1/2"
          }`}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
      </div>

      {/* Links */}
      <nav
        className={`flex flex-col gap-2 py-6 ${
          open ? "px-3 items-start" : "items-center"
        }`}
      >
        <Link
          href="/"
          className={`flex items-center rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition ${
            open
              ? "gap-3 p-3 w-full"
              : "justify-center w-12 h-12"
          }`}
        >
          <Home size={18} />
          {open && <span className="text-sm">Home</span>}
        </Link>

        <Link
          href="/daily"
          className={`flex items-center rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition ${
            open
              ? "gap-3 p-3 w-full"
              : "justify-center w-12 h-12"
          }`}
        >
          <CheckSquare size={18} />
          {open && <span className="text-sm">Daily Todos</span>}
        </Link>

        <Link
          href="/monthly"
          className={`flex items-center rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition ${
            open
              ? "gap-3 p-3 w-full"
              : "justify-center w-12 h-12"
          }`}
        >
          <CalendarDays size={18} />
          {open && <span className="text-sm">Monthly Todos</span>}
        </Link>
      </nav>

      {/* Profile */}
      <div
        className={`absolute bottom-0 w-full border-t border-gray-200 p-4 flex ${
          open ? "items-center gap-3" : "justify-center"
        }`}
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 rounded-full"
        />

        {open && (
          <span className="text-sm font-semibold text-gray-700">
            Aryan
          </span>
        )}
      </div>
    </aside>
  );
};

export default Navbar;