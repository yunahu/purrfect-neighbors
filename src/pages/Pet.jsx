import { Col, Image, Row, Space, Typography, Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
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

const ClickableSpan = styled.span`
  cursor: pointer;
`;

function Pet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [pet, setPet] = useState();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();

        setPet(data);
      } catch (error) {
        message.error("Failed to load pet.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleLocationClick = () => {
    if (pet) {
      navigate(`/explore?latitude=${pet.latitude}&longitude=${pet.longitude}&selection=pets`);
    }
  };

  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>
          {loading ? <></>: (pet && <>{pet.name} <Text><ClickableSpan onClick={handleLocationClick}>{pet.location}</ClickableSpan></Text></>)}
        </Title>
      </Space>
      { loading ? 
        <Spin/> 
        : 
        (pet ? 
        <>
          <StyledRow>
            <Col span={24} lg={16}>
              <Image src={pet.image} alt={pet.name} />
            </Col>
            <Col span={24} lg={8}>
              <Contact>
                <Title level={2}>Contact</Title>
                <Text>From: {pet.contact.name}</Text>
                <Text>Email: {pet.contact.email}</Text>
              </Contact>
            </Col>
          </StyledRow>
          <MoreInfo>
            <Bio>
              {pet.type || "Unspecified Type"} / {pet.breed || "Unspecified Breed"} / From <ClickableSpan onClick={handleLocationClick}>{pet.location}</ClickableSpan>
            </Bio>
            {pet.description}
            <br />
            id: {id}
          </MoreInfo>
        </> 
        : 
        <Text type="danger">Pet not found.</Text>
        )
      }
    </>
  );
}

export default Pet;
