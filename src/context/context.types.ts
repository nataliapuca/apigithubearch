export type ContextProviderProps = {
  children: React.ReactNode;
};

export type User = {
  login: string;
  id: number;
  avatar_url: string;
};

export type GlobalStateType = {
  isError: boolean;
  searchedPhrase: string;
  setSearchedPhrase: React.Dispatch<React.SetStateAction<string>>;
  users: User[] | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isInitialMode: boolean;
  setIsInitialMode: React.Dispatch<React.SetStateAction<boolean>>;
};
