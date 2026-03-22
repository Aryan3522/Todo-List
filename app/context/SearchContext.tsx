"use client";

import { createContext, useState, ReactNode } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}