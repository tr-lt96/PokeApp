import { createContext, useContext, useState } from "react";

export const initSearchContextValue = {
  searchQuery: "",
  // can be "all", "name" or "type"
  searchMode: "all",
  searchType: "normal",
  resultItems: [],
  pagination: {
    limit: 10,
    offset: 0,
    total: -1,
  },
  loading: true,
};

const PokemonSearchContext = createContext({
  ...initSearchContextValue,
  setSearchQuery: (query) => {},
  setSearchType: (filter) => {},
  setResultItems: (items) => {},
  setPagination: (limit, offset) => {},
  setSearchMode: (mode) => {},
  setLoading: (loading) => {},
});

export const PokemonSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(
    initSearchContextValue.searchQuery
  );
  const [searchMode, setSearchMode] = useState(
    initSearchContextValue.searchMode
  );
  const [searchType, setSearchType] = useState(
    initSearchContextValue.searchType
  );
  const [resultItems, setResultItems] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });
  const [loading, setLoading] = useState(true);

  return (
    <PokemonSearchContext.Provider
      value={{
        searchQuery,
        searchMode,
        searchType,
        resultItems,
        pagination,
        loading,
        setSearchQuery: setSearchQuery,
        setSearchMode,
        setSearchType,
        setResultItems,
        setPagination,
        setLoading,
      }}
    >
      {children}
    </PokemonSearchContext.Provider>
  );
};

export const usePokemonSearchContext = () => useContext(PokemonSearchContext);
