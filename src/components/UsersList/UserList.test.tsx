import { render, screen } from "@testing-library/react";
import { UsersList } from "./UsersList";
import { AppContext } from "../../context";
import { User } from "../../context/context.types";
import "@testing-library/jest-dom/extend-expect";

beforeAll(() => {
  class IntersectionObserverMock {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    root = null;
    rootMargin = "0px";
    thresholds = [0];
    callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    trigger(entries: IntersectionObserverEntry[]) {
      this.callback(entries, this);
    }

    takeRecords = jest.fn();
  }

  global.IntersectionObserver =
    IntersectionObserverMock as unknown as typeof IntersectionObserver;
});

const mockUsers: User[] = [
  {
    id: 1,
    login: "user1",
    avatar_url: "https://example.com/avatar1.jpg",
  },
  {
    id: 2,
    login: "user2",
    avatar_url: "https://example.com/avatar2.jpg",
  },
];

const mockFetchNextPage = jest.fn();
const mockSetSearchedPhrase = jest.fn();
const mockSetIsInitialMode = jest.fn();

const defaultContext = {
  users: mockUsers,
  fetchNextPage: mockFetchNextPage,
  hasNextPage: true,
  isFetchingNextPage: false,
  isLoading: true,
  isError: false,
  searchedPhrase: "",
  setSearchedPhrase: mockSetSearchedPhrase,
  isInitialMode: false,
  setIsInitialMode: mockSetIsInitialMode,
};

const renderWithContext = (contextValue = defaultContext) =>
  render(
    <AppContext.Provider value={contextValue}>
      <UsersList />
    </AppContext.Provider>
  );

describe("UsersList Component", () => {
  const mockFetchNextPage = jest.fn();

  it("renders the list of users correctly", () => {
    renderWithContext();

    const userCards = screen.getAllByRole("usercard");
    expect(userCards.length).toBe(2);

    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });
});
