"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Main from "@/app/components/Monthly/Main";
import Navbar from "@/app/components/Navbar";

const page = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar");
    if (stored !== null) setOpen(JSON.parse(stored));
  }, []);
  return (
    <div className="flex min-h-screen w-full">
      <Navbar open={open} setOpen={setOpen} />
      <Header sideBarOpen={open} />
      <main
        className={`transition-all duration-300 pt-18 p-4 ${
          open ? "ml-64" : "ml-20"
        } w-full`}
      >
        {/* Page Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Monthly Planner
          </h2>

          <p className="text-sm text-gray-500">
            Organize your events and plans for upcoming months
          </p>
        </div>
        <Main />
      </main>
    </div>
  );
};

export default page;
