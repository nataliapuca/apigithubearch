import { AppContext } from "../../context/index";
import { LinearProgress } from "@mui/material";
import { useContext } from "react";
import { ErrorSign, InfoSign, StyledContainer } from "./InfoBar.styles";

export const InfoBar = () => {
  const { isLoading, isInitialMode, users, isError } = useContext(AppContext);

  return (
    <>
      {isLoading && <LinearProgress />}

      <StyledContainer>
        {users?.length === 0 && !isInitialMode && !isLoading && !isError && (
          <InfoSign>No results for this phrase</InfoSign>
        )}
        {isError && <ErrorSign>Sorry, something went wrong</ErrorSign>}
      </StyledContainer>
    </>
  );
};
