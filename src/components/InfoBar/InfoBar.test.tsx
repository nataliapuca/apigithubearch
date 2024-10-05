import React from "react";
import { render, screen } from "@testing-library/react";
import { AppContext } from "../../context";
import { InfoBar } from "./InfoBar";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
import { GlobalStateType } from "../../context/context.types";

const renderWithContext = (contextValue: GlobalStateType) => {
  return render(
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <InfoBar />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

describe("InfoBar Component", () => {
  it("displays loading indicator when isLoading is true", () => {
    renderWithContext({
      isLoading: true,
      isInitialMode: false,
      users: [],
      isError: false,
      setSearchedPhrase: () => {},
      setIsInitialMode: () => {},
      fetchNextPage: () => {},
      searchedPhrase: " ",
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it('displays "No results for this phrase" when users is empty, not loading, no error, and not initial mode', () => {
    renderWithContext({
      isLoading: false,
      isInitialMode: false,
      users: [],
      isError: false,
      setSearchedPhrase: () => {},
      setIsInitialMode: () => {},
      fetchNextPage: () => {},
      searchedPhrase: " ",
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    expect(screen.getByText(/No results for this phrase/i)).toBeInTheDocument();
  });

  it('does not display "No results for this phrase" when in initial mode', () => {
    renderWithContext({
      isLoading: false,
      isInitialMode: true,
      users: [],
      isError: false,
      setSearchedPhrase: () => {},
      setIsInitialMode: () => {},
      fetchNextPage: () => {},
      searchedPhrase: " ",
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    expect(
      screen.queryByText(/No results for this phrase/i)
    ).not.toBeInTheDocument();
  });

  it("displays an error message when isError is true", () => {
    renderWithContext({
      isLoading: false,
      isInitialMode: false,
      users: [],
      isError: true,
      setSearchedPhrase: () => {},
      setIsInitialMode: () => {},
      fetchNextPage: () => {},
      searchedPhrase: " ",
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    expect(
      screen.getByText(/Sorry, something went wrong/i)
    ).toBeInTheDocument();
  });

  it("does not display any messages when users array has items", () => {
    renderWithContext({
      isLoading: false,
      isInitialMode: false,
      users: [{ id: 1, login: "Natalia", avatar_url: "" }],
      isError: false,
      setSearchedPhrase: () => {},
      setIsInitialMode: () => {},
      fetchNextPage: () => {},
      searchedPhrase: " ",
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    expect(
      screen.queryByText(/No results for this phrase/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Sorry, something went wrong/i)
    ).not.toBeInTheDocument();
  });
});
