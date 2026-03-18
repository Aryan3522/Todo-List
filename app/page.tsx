"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Home/Main";
import Navbar from "./components/Navbar";

export default function Home(): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar");
    if (stored !== null) {
      setOpen(JSON.parse(stored) as boolean);
    }
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
        <h1 className="text-4xl text-center font-semibold text-gray-800 mb-4">
          Your Todos
        </h1>
        <Main />
      </main>
    </div>
  );
}