import { Radio, Select, Space } from "antd";
import { useState } from "react";
import { FaCat } from "react-icons/fa6";
import styled from "styled-components";

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

const types = ["Cat", "Dog"];
const breedOptions = {
  Cat: [
    "Abyssinian",
    "American Bobtail",
    "American Curl",
    "American Shorthair"
  ],
  Dog: ["Affenpinscher", "Afghan Hound", "Airedale Terrier", "Akita"]
};

function Filter({ selection, handleChange }) {
  const [breeds, setBreeds] = useState(breedOptions[types[0]]);
  const [breed, setBreed] = useState(null);
  const handleTypeChange = (value) => {
    setBreeds(breedOptions[value]);
    setBreed(null);
  };
  const onBreedChange = (value) => {
    setBreed(value);
  };

  return (
    <>
      <Space>
        <StyledRadioGroup
          value={selection}
          onChange={(e) => handleChange(e.target.value)}
        >
          <StyledRadioButton value="pets">Pets</StyledRadioButton>
          <StyledRadioButton value="products">Products</StyledRadioButton>
        </StyledRadioGroup>
        {selection === "pets" && (
          <>
            <StyledSelect
              placeholder="Type"
              suffixIcon={<FaCat />}
              onChange={handleTypeChange}
              options={types?.map((type) => ({ value: type, label: type }))}
              allowClear
            />
            <StyledSelect
              placeholder="Breed"
              value={breed}
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
