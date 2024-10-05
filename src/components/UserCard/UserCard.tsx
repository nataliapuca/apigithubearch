import Card from "@mui/material/Card";
import React from "react";
import { User } from "../../context/context.types";
import Avatar from "@mui/material/Avatar";
import { UserContainer } from "./UserCard.styles";

export type UserCardPorops = {
  user: User;
};

export const UserCard = ({ user }: UserCardPorops) => {
  return (
    <Card variant="outlined" sx={{ padding: "10px" }}>
      <UserContainer>
        <Avatar alt={user.login} src={user.avatar_url} />
        <div>{user.login}</div>
      </UserContainer>
    </Card>
  );
};
