import SampleCard from "src/pages/Home/components/SampleCard/SampleCard";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;

const Home = () => {
  return (
    <Container>
      Home..
      <SampleCard />
    </Container>
  );
};

export default Home;
