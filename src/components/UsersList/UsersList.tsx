import React, { useContext, useEffect, useRef, useCallback } from "react";
import { AppContext } from "../../context";
import { UserCard } from "../UserCard/UserCard";
import { ObserverBar, StyledList, StyledListItem } from "./UsersList.styles";
import LinearProgress from "@mui/material/LinearProgress";
import { debounce } from "lodash";
import { User } from "../../context/context.types";

export const UsersList = () => {
  const { users, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useContext(AppContext);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: { isIntersecting: boolean }[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const debouncedHandleIntersection = useCallback(
    debounce(handleIntersection, 200),
    [handleIntersection]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(debouncedHandleIntersection);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
      debouncedHandleIntersection.cancel();
    };
  }, [debouncedHandleIntersection]);

  const renderUserCards = useCallback(
    (users: User[]) =>
      users?.map((user) => (
        <StyledListItem key={user.id} role="usercard">
          <UserCard user={user} />
        </StyledListItem>
      )),
    []
  );

  //czyste funkcje, debouncing, funkcje wyższego rzędu i optymalizacja za pomocą useCallback - wprowadzenie technik programowania funkcyjnego
  //pozwala na lepszą czytelność kodu, lepsze zarządzanie stanem aplikacji

  return (
    <StyledList>
      {users && renderUserCards(users)}
      {isFetchingNextPage && <LinearProgress />}
      <ObserverBar ref={observerRef} data-testid="observer-bar" />
    </StyledList>
  );
};
