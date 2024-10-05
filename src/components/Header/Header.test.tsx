import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import myImage from "../../assets/gitlogo.png";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

describe("Header Component", () => {
  it("renders the title correctly", () => {
    const title = "My GitHub";

    render(
      <ThemeProvider theme={theme}>
        <Header title={title} />
      </ThemeProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders the image with correct src and alt attributes", () => {
    const title = "My GitHub";

    render(
      <ThemeProvider theme={theme}>
        <Header title={title} />
      </ThemeProvider>
    );

    const image = screen.getByAltText("Github Logo");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", myImage);
  });

  it("matches snapshot", () => {
    const title = "My GitHub";

    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <Header title={title} />
      </ThemeProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
