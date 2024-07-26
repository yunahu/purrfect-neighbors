import { Col, Image, Row, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Back from "../components/Back";

const { Title, Text } = Typography;

const StyledRow = styled(Row)`
  background-color: #fff;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
`;

const Contact = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MoreInfo = styled.div`
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  color: var(--color-grey-400);
  line-height: 1.5;
`;

const Bio = styled.div`
  border-top: 1px solid var(--color-grey-400);
  border-bottom: 1px solid var(--color-grey-400);
  padding: 12px 0;

  font-weight: 700;
  font-style: italic;
`;

function Pet() {
  const { id } = useParams();

  // Simulate pet bio data
  const { name, type, breed, location, image, contact, description } = {
    name: "Dapang",
    type: "Cat",
    breed: "British Shorthair",
    location: "Vancouver, BC",
    image: "https://http.cat/images/200.jpg",
    contact: {
      name: "Harry Potter",
      email: "abc@mail.com",
      phone: "123-456-7890"
    },
    description:
      "Dapang is a British Shorthair cat. He is 3 years old and loves to play with toys."
  };

  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>
          {name}, {location}
        </Title>
      </Space>
      <StyledRow>
        <Col span={24} lg={16}>
          <Image src={image} alt={name} />
        </Col>
        <Col span={24} lg={8}>
          <Contact>
            <Title level={2}>Contact</Title>
            <Text>From: {contact.name}</Text>
            <Text>Email: {contact.email}</Text>
            <Text>Phone: {contact.phone}</Text>
          </Contact>
        </Col>
      </StyledRow>
      <MoreInfo>
        <Bio>
          {type} / {breed} / From {location}
        </Bio>
        {description}
        <br />
        id: {id}
        <br />
        Fetch more information about the pet by ID later
      </MoreInfo>
    </>
  );
}

export default Pet;
