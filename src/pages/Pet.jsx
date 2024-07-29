import { Col, Image, Row, Space, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [pet, setPet] = useState({
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
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        
        const fetchedPet = {
          name: data.title,
          type: data.type || "Unspecified Type",
          breed: data.breed || "Unspecified Breed",
          location: data.location,
          image: data.imageUrl || "https://http.cat/images/200.jpg",
          contact: {
            name: data.postBy,
            email: data.contactEmail || "abc@mail.com",
            phone: data.contactPhone || "123-456-7890"
          },
          description: data.description
        };

        setPet(fetchedPet);
      } catch (error) {
        message.error("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>
          {pet.name}, {pet.location}
        </Title>
      </Space>
      <StyledRow>
        <Col span={24} lg={16}>
          <Image src={pet.image} alt={pet.name} />
        </Col>
        <Col span={24} lg={8}>
          <Contact>
            <Title level={2}>Contact</Title>
            <Text>From: {pet.contact.name}</Text>
            <Text>Email: {pet.contact.email}</Text>
            <Text>Phone: {pet.contact.phone}</Text>
          </Contact>
        </Col>
      </StyledRow>
      <MoreInfo>
        <Bio>
          {pet.type} / {pet.breed} / From {pet.location}
        </Bio>
        {pet.description}
        <br />
        id: {id}
        <br />
        Fetch more information about the pet by ID later
      </MoreInfo>
    </>
  );
}

export default Pet;
