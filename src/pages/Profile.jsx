import { LuChevronLeft } from "react-icons/lu";
import styled from "styled-components";

import Button from "../components/Button";
import ContentBox from "../components/ContentBox";
import Heading from "../components/Heading";
import Row from "../components/Row";

const Avatar = styled.img`
  width: 80px;
  height: auto;
  border-radius: var(--border-radius-full);
  border: 8px solid var(--color-brand-50);
`;

function Profile() {
  return (
    <>
      <Row>
        <Button>
          <LuChevronLeft />
          Back
        </Button>
        <Heading as="h1">Profile</Heading>
      </Row>
      <ContentBox>
        <Row>
          <Avatar
            src="https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_1.png"
            alt="User avatar"
          />
          <Heading as="h2">Username</Heading>
          <Button size="small">Edit</Button>
        </Row>
        <p>Profile content goes here.</p>
      </ContentBox>
    </>
  );
}

export default Profile;
