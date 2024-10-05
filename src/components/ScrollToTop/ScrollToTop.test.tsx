import { render, screen, fireEvent, act } from "@testing-library/react";
import { ScrollToTop } from "./ScrollToTop";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

describe("ScrollToTop Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
  });

  it("does not render the button initially", () => {
    render(
      <ThemeProvider theme={theme}>
        <ScrollToTop />
      </ThemeProvider>
    );
    expect(screen.queryByText(/Scroll to Top/i)).not.toBeInTheDocument();
  });

  it("calls window.scrollTo when the button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <ScrollToTop />
      </ThemeProvider>
    );

    act(() => {
      window.pageYOffset = 150;
      window.dispatchEvent(new Event("scroll"));
    });

    fireEvent.click(screen.getByText(/Scroll to Top/i));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
