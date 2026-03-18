"use client";

import { Previous } from "./Previous";
import { Today } from "./Today";
import { Tomorrow } from "./Tomorrow";

export default function Main() {
  return (
    <div className="mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        <div className="bg-[#FDF9F2] rounded-xl p-5 min-h-80">
          <Previous />
        </div>

        <div className="bg-[#eef1ff] rounded-xl p-5 min-h-80">
          <Today />
        </div>

        <div className="bg-[#ECFDF5] rounded-xl p-5 min-h-80">
          <Tomorrow />
        </div>
      </div>
    </div>
  );
}