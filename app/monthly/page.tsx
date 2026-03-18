"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Monthly/Main";
import Navbar from "../components/Navbar";

export default function Page() {
  const [navOpen, setNavOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar");
    if (stored !== null) {
      setNavOpen(stored === "true"); // safer than JSON.parse
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <Navbar open={navOpen} setOpen={setNavOpen} />
      <Header sideBarOpen={navOpen} />

      <main
        className={`transition-all duration-300 pt-18 p-4 ${
          navOpen ? "ml-64" : "ml-20"
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
}