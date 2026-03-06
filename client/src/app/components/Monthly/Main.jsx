"use client";

import React, { useEffect, useState } from "react";
import { Cards } from "./Cards";

const Main = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex justify-center py-10">
      {/* Cards */}
      <div className="w-full">
        <Cards />
      </div>
    </div>
  );
};

export default Main;