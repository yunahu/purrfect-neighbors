import { Button, Divider, Space, Tabs, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";

import ContentBox from "../components/ContentBox";
import UserAvatar from "../components/UserAvatar";

const { Title } = Typography;

const Item = styled.div`
  padding: 8px;
  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
  }
`;

function Profile() {
  const [username, setUsername] = useState("Username");
  const [editName, setEditName] = useState(username);
  const [isEditing, setIsEditing] = useState(false);

  // Static data for testing, replace with real data from API
  const postsData = [
    { key: "1", title: "Post 1", content: "Content of Post 1" },
    { key: "2", title: "Post 2", content: "Content of Post 2" }
  ];

  const posts = postsData.map((post, i) => (
    <li key={post.key}>
      <Item>
        <Title level={3}>{post.title}</Title>
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
    if (editName.trim() === "") {
      setEditName(username);
    } else {
      setUsername(editName);
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditName(e.target.value);
  };

  return (
    <>
      <Title level={1}>User Profile</Title>
      <ContentBox>
        <Space size="middle">
          <UserAvatar name={username} size={64} />
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={handleChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              <Title level={2}>{editName}</Title>
              <Button shape="round" onClick={handleEdit}>
                Edit
              </Button>
            </>
          )}
        </Space>
        <Tabs defaultActiveKey="1" items={items} />
      </ContentBox>
    </>
  );
}

export default Profile;
