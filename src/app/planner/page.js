"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">

      <div className="max-w-xl text-center">

        {/* Heading */}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to Todo Planner
        </h1>

        {/* Description */}

        <p className="text-gray-500 mb-8 leading-relaxed">
          A simple productivity tool to organize your tasks efficiently.
          Track your daily todos, plan upcoming events, and stay focused on
          what matters the most.
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-gray-900 transition"
          >
            Home
          </button>

          <button
            onClick={() => router.push("/planner/daily")}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#D7DDFF] text-[#3730A3] hover:bg-[#C4CCFF] transition"
          >
            Daily Planner
          </button>

          <button
            onClick={() => router.push("/planner/monthly")}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#D1FAE5] text-[#047857] hover:bg-[#B8F3D7] transition"
          >
            Monthly Planner
          </button>

        </div>

      </div>

    </div>
  );
};

export default Page;