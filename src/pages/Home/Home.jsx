import { Radio } from "antd";
import { useState, useMemo } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

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
    color: var(--color-brand-100);
    &:hover {
      background-color: var(--color-grey-50);
    }
    &.ant-radio-button-wrapper-checked {
      background-color: var(--color-grey-200);
      color: var(--color-grey-400);
    }
  }
`;

const Home = () => {
  const location = useLocation();

  const getQueryParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    const latitude = parseFloat(searchParams.get('latitude')) || 49.2827; // Default to Vancouver latitude
    const longitude = parseFloat(searchParams.get('longitude')) || -123.1207; // Default to Vancouver longitude
    const selection = searchParams.get('selection') || 'products';

    return { latitude, longitude, selection };
  }, [location.search]);

  const { latitude, longitude, selection: initialSelection } = getQueryParams;

  const radius = 100; // Default radius

  const [selection, setSelection] = useState(initialSelection);

  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <Container>
      <StyledRadioGroup value={selection} onChange={handleChange}>
        <StyledRadioButton value="pets">Pets</StyledRadioButton>
        <StyledRadioButton value="products">Products</StyledRadioButton>
      </StyledRadioGroup>
      <Map latitude={latitude} longitude={longitude} radius={radius} selection={selection} />
    </Container>
  );
};

export default Home;
