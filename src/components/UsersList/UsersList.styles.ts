import styled, { keyframes } from "styled-components";

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

export const StyledList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledListItem = styled.li`
  margin-bottom: 16px;
  list-style: none;

  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const ObserverBar = styled.div`
  height: 1px;
`;
