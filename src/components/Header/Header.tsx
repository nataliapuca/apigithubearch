import myImage from "../../assets/gitlogo.png";
import { StyledContainer, StyledImage } from "./Header.styles";

export type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <StyledContainer>
      <StyledImage src={myImage} alt="Github Logo" />
      <div>{title}</div>
    </StyledContainer>
  );
};
