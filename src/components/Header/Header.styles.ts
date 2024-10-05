import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  width: 100%;
  height: 100%;
  position: relative;
`;
