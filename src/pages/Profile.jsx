import { Button, Divider, Space, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ContentBox from "../components/ContentBox";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../context/useAuth";

const { Title } = Typography;

const Item = styled.div`
  padding: 8px;
  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
    cursor: pointer;
  }
`;

function Profile() {
  const { user, updateUsername } = useAuth();
  const navigate = useNavigate();
  const username = user ? user.name : "Guest";
  const [editName, setEditName] = useState(username);
  const [isEditing, setIsEditing] = useState(false);

  const [postsData, setPostsData] = useState([
    { id: "1", title: "", content: "This user has no posts." }
  ]);
  const [commentsData, setCommentsData] = useState([
    { id: "1", content: "This user has no comments." }
  ]);

  const posts = postsData.map((post, i) => (
    <li key={post.id}>
      <Item onClick={() => navigate(`/product/${post.id}`)}>
        <Title level={3}>{post.title}</Title>
        <p>{post.content}</p>
      </Item>
      {i < postsData.length - 1 && <Divider />}
    </li>
  ));

  const comments = commentsData.map((comment, i) => (
    <li key={comment.id}>
      <Item>
        <p>{comment.content}</p>
      </Item>
      {i < commentsData.length - 1 && <Divider />}
    </li>
  ));

  const items = [
    { key: "1", label: "Posts", children: <ul>{posts}</ul> },
    { key: "2", label: "Comments", children: <ul>{comments}</ul> }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editName.trim() === "") {
      setEditName(username);
    } else {
      updateUsername(editName);
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditName(e.target.value);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/posts`,
          {
            method: "GET",
            credentials: "include"
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPostsData(data);

        const response2 = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/comments`,
          {
            method: "GET",
            credentials: "include"
          }
        );
        if (!response2.ok) {
          throw new Error("Failed to fetch comments");
        }
        const comments = await response2.json();
        setCommentsData(comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, []);

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
