"use client";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Home/Main";
import Navbar from "./components/Navbar";

export default function Home() {
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
        <h1 className="text-lg font-semibold text-gray-800">
          Design boards
        </h1>

        <Main />
      </main>
    </div>
  );
}