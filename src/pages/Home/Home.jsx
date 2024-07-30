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
  return (
    <Container>
      <Filter />
      <Map />
    </Container>
  );
};

export default Home;
