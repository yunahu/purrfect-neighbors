import { useCallback, useState } from "react";
import styled from "styled-components";

import Filter from "../../components/Filter";
import Map from "./components/Map";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  const latitude = 49.2827; // Vancouver latitude
  const longitude = -123.1207; // Vancouver longitude
  const radius = 100;

  const [selection, setSelection] = useState("products");

  const handleChange = useCallback((value) => {
    setSelection(value);
  }, []);

  return (
    <Container>
      <Filter selection={selection} handleChange={handleChange} />
      <Map
        latitude={latitude}
        longitude={longitude}
        radius={radius}
        selection={selection}
        handleSelection={handleChange}
      />
    </Container>
  );
};

export default Home;
