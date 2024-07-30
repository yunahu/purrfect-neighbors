import { Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { FaCat, FaPaw } from "react-icons/fa";
import styled from "styled-components";

import { useSearch } from "../context/useSearch";

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  max-width: 20rem;
  border: 3px solid #bfbfbf;
  border-radius: 25px;
  margin: 1rem 2rem;
  padding: 3px;
`;

const StyledRadioButton = styled(Radio.Button)`
  && {
    flex: 1;
    padding: 5px 20px;
    border: none;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--color-grey-400);
    &:hover {
      background-color: var(--color-grey-200);
    }
    &.ant-radio-button-wrapper-checked {
      background-color: var(--color-brand-50);
      color: var(--color-brand-100);
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 120px;
`;

const types = ["Cat", "Dog", "Bird", "Rabbit", "Hamster"];
const breedOptions = {
  Cat: ["Siamese"],
  Dog: ["Golden Retriever"],
  Bird: ["Parakeet"],
  Rabbit: ["Holland Lop"],
  Hamster: ["Syrian"]
};

function Filter() {
  const { filter, setFilter } = useSearch();
  const { selection, type, breed } = filter;
  const [breeds, setBreeds] = useState(breedOptions[types[0]]);

  useEffect(() => {
    if (type) {
      setBreeds(breedOptions[type]);
    } else {
      setBreeds(breedOptions[types[0]]);
    }
  }, [type]);

  const handleSelection = (e) => {
    const newSelection = e.target.value;
    if (newSelection === selection) return;
    setFilter((prev) => ({ ...prev, selection: newSelection }));
  };

  const handleTypeChange = (value) => {
    if (!value) {
      setBreeds(breedOptions[types[0]]);
      setFilter((prev) => ({ ...prev, type: "", breed: "" }));
      return;
    }
    if (value === type) return;

    setBreeds(breedOptions[value]);
    setFilter((prev) => ({ ...prev, type: value, breed: "" }));
  };

  const onBreedChange = (value) => {
    if (value === breed) return;
    if (!type) {
      const matchedType = types.find((t) => breedOptions[t].includes(value));
      setFilter((prev) => ({ ...prev, type: matchedType, breed: value }));
      return;
    }
    setFilter((prev) => ({ ...prev, breed: value }));
  };

  return (
    <>
      <Space>
        <StyledRadioGroup
          value={selection === "" ? "pets" : selection}
          onChange={handleSelection}
        >
          <StyledRadioButton value="pets">Pets</StyledRadioButton>
          <StyledRadioButton value="products">Products</StyledRadioButton>
        </StyledRadioGroup>
        {selection === "pets" && (
          <>
            <StyledSelect
              placeholder="Type"
              suffixIcon={<FaCat />}
              value={type !== "" ? type : null}
              onChange={handleTypeChange}
              options={types?.map((type) => ({ value: type, label: type }))}
              allowClear
            />
            <StyledSelect
              placeholder="Breed"
              suffixIcon={<FaPaw />}
              value={breed !== "" ? breed : null}
              onChange={onBreedChange}
              options={breeds?.map((breed) => ({ value: breed, label: breed }))}
              allowClear
            />
          </>
        )}
      </Space>
    </>
  );
}

export default Filter;
