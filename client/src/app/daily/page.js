"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header";
import Main from "@/app/components/daily/Main";
import Navbar from "@/app/components/Navbar";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <Navbar open={open} setOpen={setOpen} />
      <Header sideBarOpen={open} />

      <main
        className={`transition-all duration-300 pt-18 p-4 ${
          open ? "ml-64" : "ml-20"
        } w-full`}
      >
        {/* Page Heading */}

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Daily Task Manager
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Plan and track your daily productivity
          </p>
        </div>

        <Main />
      </main>
    </div>
  );
};

export default Page;