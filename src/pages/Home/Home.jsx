import { Radio } from "antd";
import { useState } from "react";
import styled from "styled-components";

import Map from "./components/Map";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

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

const Home = () => {
  const latitude = 49.2827; // Vancouver latitude
  const longitude = -123.1207; // Vancouver longitude
  const radius = 100;

  const [selection, setSelection] = useState("products");

  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <Container>
      <StyledRadioGroup value={selection} onChange={handleChange}>
        <StyledRadioButton value="pets">Pets</StyledRadioButton>
        <StyledRadioButton value="products">Products</StyledRadioButton>
      </StyledRadioGroup>
      <Map
        latitude={latitude}
        longitude={longitude}
        radius={radius}
        selection={selection}
      />
    </Container>
  );
};

export default Home;
