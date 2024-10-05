import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px); 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px); 
  }
`;

export const ScrollTopButton = styled.button<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  opacity: 0;

  animation: ${({ isVisible }) =>
    isVisible
      ? css`
          ${fadeIn} 0.5s ease-out forwards
        `
      : css`
          ${fadeOut} 0.5s ease-out forwards
        `};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;
