import { Button } from "antd";
import { useState } from "react";
import SampleCard from "src/pages/Home/components/SampleCard/SampleCard";
import styled from "styled-components";

import Popup from "../../components/Popup";

const Container = styled.div`
  height: 100%;
`;

// Sample data for popup content

const popups = [
  {
    title: "Product Name",
    link: "/product/1",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua."
  },
  {
    image: "https://http.cat/images/200.jpg",
    title: "Pet Name",
    link: "/pet/1",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua."
  },
  {
    image: "https://http.cat/images/200.jpg",
    title: "Pet Name2",
    link: "/pet/2",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua."
  }
];

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [popupContent, setPopupContent] = useState({});

  const handleButtonClick = (e, content) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: Math.min(rect.x, window.innerWidth - 300),
      y: rect.y + rect.height + 8
    });
    console.log("position", position);
    setPopupContent(content);
    setVisible(true);
  };

  return (
    <Container>
      Home..
      <SampleCard />
      {popups.map((popup, index) => (
        <Button key={index} onClick={(e) => handleButtonClick(e, popup)}>
          Pin {index + 1}
        </Button>
      ))}
      {visible && (
        <Popup
          open={visible}
          onClose={() => setVisible(false)}
          position={position}
          content={popupContent}
        />
      )}
    </Container>
  );
};

export default Home;
