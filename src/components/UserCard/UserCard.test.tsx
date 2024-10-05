import { render, screen } from "@testing-library/react";
import { UserCard } from "./UserCard";
import { User } from "../../context/context.types";

const mockUser: User = {
  login: "johndoe",
  id: 1,
  avatar_url: "https://example.com/avatar.jpg",
};

describe("UserCard Component", () => {
  it("renders correctly", () => {
    render(<UserCard user={mockUser} />);
    const card = screen.getByText("johndoe");
    expect(card).toBeTruthy();
  });

  it("does not render if user data is incomplete", () => {
    render(<UserCard user={{ login: "", id: 0, avatar_url: "" }} />);

    expect(screen.queryByText("johndoe")).not.toBeInTheDocument();
    expect(screen.queryByAltText("johndoe's avatar")).not.toBeInTheDocument();
  });
});
