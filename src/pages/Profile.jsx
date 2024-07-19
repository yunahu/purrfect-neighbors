import { ConfigProvider, Divider, Tabs } from "antd";
import { useState } from "react";
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

const Item = styled.div`
  padding: 8px;
  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
  }
`;

function Profile() {
  const [username, setUsername] = useState("Username");
  const [isEditing, setIsEditing] = useState(false);

  // Static data for testing, replace with real data from API
  const postsData = [
    { key: "1", title: "Post 1", content: "Content of Post 1" },
    { key: "2", title: "Post 2", content: "Content of Post 2" }
  ];

  const posts = postsData.map((post, i) => (
    <li key={post.key}>
      <Item>
        <Heading as="h3">{post.title}</Heading>
        <p>{post.content}</p>
      </Item>
      {i < postsData.length - 1 && <Divider />}
    </li>
  ));

  const items = [
    { key: "1", label: "Posts", children: <ul>{posts}</ul> },
    { key: "2", label: "Comments", children: "Content of Comments" }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

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
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={handleChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              <Heading as="h2">{username}</Heading>
              <Button size="small" onClick={handleEdit}>
                Edit
              </Button>
            </>
          )}
        </Row>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#f56b40",
              colorPrimaryBorder: "#ffd0c3"
            }
          }}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      </ContentBox>
    </>
  );
}

export default Profile;
