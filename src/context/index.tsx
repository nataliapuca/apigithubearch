import React, { createContext, useState, useMemo } from "react";
import { useFetchUsers } from "../hoooks/useFetchUsers";
import { ContextProviderProps, GlobalStateType } from "./context.types";

const defaultState: GlobalStateType = {
  isError: false,
  searchedPhrase: "",
  setSearchedPhrase: () => {},
  users: [],
  fetchNextPage: () => {},
  hasNextPage: undefined,
  isLoading: false,
  isFetchingNextPage: false,
  isInitialMode: true,
  setIsInitialMode: () => {},
};

export const AppContext = createContext<GlobalStateType>(defaultState);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [searchedPhrase, setSearchedPhrase] = useState<string>("");
  const [isInitialMode, setIsInitialMode] = useState<boolean>(true);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useFetchUsers(searchedPhrase);

  const users = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page);
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        searchedPhrase,
        setSearchedPhrase,
        users,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        isInitialMode,
        setIsInitialMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
