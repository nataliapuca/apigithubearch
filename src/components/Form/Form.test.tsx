import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppContext } from "../../context";
import { Form } from "./Form";
import { act } from "react-dom/test-utils";

const mockSetSearchedPhrase = jest.fn();
const mockSetIsInitialMode = jest.fn();
const mockIsLoading = false;

const renderWithContext = (children: React.ReactNode) => {
  return render(
    <AppContext.Provider
      value={{
        setSearchedPhrase: mockSetSearchedPhrase,
        setIsInitialMode: mockSetIsInitialMode,
        isLoading: mockIsLoading,
        isError: false,
        fetchNextPage: () => {},
        searchedPhrase: " ",
        users: [],
        hasNextPage: false,
        isInitialMode: true,
        isFetchingNextPage: false,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

describe("Form Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form and the TextField", () => {
    renderWithContext(<Form />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  });

  it("does not show error when the input is valid", async () => {
    renderWithContext(<Form />);

    fireEvent.input(screen.getByLabelText(/Username/i), {
      target: { value: "ValidUsername" },
    });

    fireEvent.blur(screen.getByLabelText(/Username/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/name is a required field/i)
      ).not.toBeInTheDocument();
    });
  });

  it("updates searched phrase on valid input after debounce", async () => {
    jest.useFakeTimers();

    renderWithContext(<Form />);

    fireEvent.input(screen.getByLabelText(/Username/i), {
      target: { value: "TestUser" },
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(mockSetIsInitialMode).toHaveBeenCalledWith(false);
    });

    await waitFor(() => {
      expect(mockSetSearchedPhrase).toHaveBeenCalledWith("TestUser");
    });

    jest.useRealTimers();
  });

  it("disables the TextField when isLoading is true", () => {
    const loadingContextValue = {
      setSearchedPhrase: mockSetSearchedPhrase,
      setIsInitialMode: mockSetIsInitialMode,
      isLoading: true,
      fetchNextPage: () => {},
      searchedPhrase: "",
      users: [],
      hasNextPage: false,
      isInitialMode: true,
      isFetchingNextPage: false,
      isError: false,
    };

    render(
      <AppContext.Provider value={loadingContextValue}>
        <Form />
      </AppContext.Provider>
    );

    const input = screen.getByLabelText(/Username/i);
    expect(input).toBeDisabled();
  });
});
