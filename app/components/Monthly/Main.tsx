"use client";

import { useEffect, useState } from "react";
import { Cards } from "./Cards";

export default function Main() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full">
        <Cards />
      </div>
    </div>
  );
}