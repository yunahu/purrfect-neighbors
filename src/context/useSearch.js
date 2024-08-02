import { createContext, useContext } from "react";

const SearchContext = createContext();

const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export { SearchContext, useSearch };
