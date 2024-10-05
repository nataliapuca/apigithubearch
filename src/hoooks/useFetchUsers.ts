import { User } from "../context/context.types";
import { useInfiniteQuery } from "react-query";

const fetchUsers = async ({
  pageParam = 1,
  searchedPhrase,
}: {
  pageParam?: number;
  searchedPhrase: string;
}): Promise<User[]> => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${searchedPhrase}&per_page=30&page=${pageParam}`
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Network response was not ok");
  }

  const result = await response.json();
  return result.items;
};

export const useFetchUsers = (searchedPhrase: string) => {
  return useInfiniteQuery(
    ["users", searchedPhrase],
    ({ pageParam }) => fetchUsers({ pageParam, searchedPhrase }),
    {
      enabled: !!searchedPhrase,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 30 ? pages.length + 1 : undefined;
      },
    }
  );
};
