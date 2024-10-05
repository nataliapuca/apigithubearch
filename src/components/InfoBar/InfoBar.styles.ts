import styled from "styled-components";

export const ErrorSign = styled.div`
  color: ${({ theme }) => theme.colors.red}; // Accessing theme colors
`;

export const InfoSign = styled.div`
  color: ${({ theme }) => theme.colors.blue}; // Accessing theme colors
`;

export const StyledContainer = styled.div`
  padding-left: 10px;
`;
