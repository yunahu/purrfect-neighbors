import styled from "styled-components";
import Map from "./components/Map";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Home = () => {
  const latitude = 49.2827; // Vancouver latitude
  const longitude = -123.1207; // Vancouver longitude
  const radius = 100;

  return (
    <Container>
      <Map latitude={latitude} longitude={longitude} radius={radius} />
    </Container>
  );
};

export default Home;
