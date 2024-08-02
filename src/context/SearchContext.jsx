import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { SearchContext } from "./useSearch";

const SEARCH_QUERY = gql`
  query Search($term: String, $geolocation: Geolocation, $filter: Filter) {
    search(term: $term, geolocation: $geolocation, filter: $filter) {
      searchPets {
        id
        pet_name
        pet_type
        breed
        pet_address
        latitude
        longitude
        image
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
  const [filter, setFilter] = useState({
    selection: "pets",
    type: "",
    breed: ""
  });
  const [geolocation, setGeolocation] = useState({
    latitude: 49.2827, // Vancouver latitude
    longitude: -123.1207, // Vancouver longitude
    radius: 100
  });

  const { data, loading, error, refetch } = useQuery(SEARCH_QUERY, {
    variables: {
      term: searchTerm || null,
      geolocation: geolocation || null,
      filter: !searchTerm
        ? filter
        : { selection: "", type: filter.type, breed: filter.breed }
    },
    skip: searchTerm === "" && !geolocation.latitude
  });

  const pets = data?.search?.searchPets || [];
  const products = data?.search?.searchProducts || [];

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, geolocation, filter, refetch]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        geolocation,
        setGeolocation,
        filter,
        setFilter,
        loading,
        error,
        pets,
        products
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider };
