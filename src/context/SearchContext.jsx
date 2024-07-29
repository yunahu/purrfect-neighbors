import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import { SearchContext } from "./useSearch";

const SEARCH_QUERY = gql`
  query Search($term: String!) {
    search(term: $term) {
      searchPets {
        id
        name
        type
        breed
        address
        latitude
        longitude
      }
      searchProducts {
        id
        title
        content
        latitude
        longitude
      }
    }
  }
`;

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error } = useQuery(SEARCH_QUERY, {
    variables: { term: searchTerm },
    skip: searchTerm === ""
  });

  const pets = data?.search?.searchPets || [];
  const products = data?.search?.searchProducts || [];

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, loading, error, pets, products }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider };
