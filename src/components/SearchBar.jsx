import { Input } from "antd";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useSearch } from "../context/useSearch";

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  height: 48px;
  border: 3px solid #bfbfbf;
  border-radius: var(--border-radius-full);
  &:hover,
  &:focus-within {
    border-color: var(--color-brand-50);
  }
`;

const PopOver = styled.div`
  position: absolute;
  top: 100%;
  left: 20px;
  width: 500px;
  min-height: 200px;
  background-color: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

function SearchBar() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, loading, error, pets, products } =
    useSearch();
  const [value, setValue] = useState(searchTerm);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value.trim() !== "" && value.trim() !== searchTerm) {
        console.log(value);
        setSearchTerm(value);
        setIsVisible(true);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value, searchTerm, setSearchTerm]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsVisible(e.target.value !== "");
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsVisible(false);
    console.log(pets, products);
  };

  return (
    <>
      <SearchBox>
        <Input
          placeholder="Seach for pets or products"
          prefix={<LuSearch color="#bfbfbf" />}
          variant="borderless"
          size="large"
          value={value}
          onChange={handleChange}
          onPressEnter={handleSearch}
          onFocus={(e) => setIsVisible(e.target.value !== "")}
          onBlur={handleBlur}
          allowClear
        />
      </SearchBox>
      {isVisible && (
        <PopOver>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!loading &&
            !error &&
            pets &&
            pets.length === 0 &&
            products &&
            products.length === 0 && <p>No results found</p>}
          {pets &&
            pets.map((pet) => (
              <div key={pet.id} onClick={() => navigate(`/pet/${pet.id}`)}>
                <p>
                  {pet.name}, {pet.type}, {pet.breed}, {pet.address}
                </p>
              </div>
            ))}
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <p>{product.title}</p>
              </div>
            ))}
        </PopOver>
      )}
    </>
  );
}

export default SearchBar;
