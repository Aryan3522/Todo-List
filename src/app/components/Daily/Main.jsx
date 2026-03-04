"use client";

import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import { Previous } from "./Previous";
import { Today } from "./Today";
import { Tomorrow } from "./Tomorrow";

const Main = () => {
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    setmounted(true)
  }, [mounted])
  if (!mounted) return
  return (
    <div className="mx-auto py-8">

      {/* Task Sections */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {/* Previous Tasks */}
        <div className="bg-[#FDF9F2] rounded-2xl p-5 min-h-112.5">
          <Previous />
        </div>
        {/* Today Tasks */}
        <div className="bg-[#eef1ff] rounded-2xl p-5 min-h-112.5">
          <Today />
        </div>
        {/* Tomorrow Tasks */}
        <div className="bg-[#ECFDF5] rounded-2xl p-5 min-h-112.5">
          <Tomorrow />
        </div>

      </div>

    </div>
  );
};

export default Main;