import { Button, Divider, Space, Tabs, Typography, Spin, message } from "antd";
import { useState, useEffect } from "react";
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
  const username = user ? user.name : "Guest";

  const navigate = useNavigate();
  
  const [editName, setEditName] = useState(username);
  const [isEditing, setIsEditing] = useState(false);

  const [postsData, setPostsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  const posts = loadingPosts ? <Spin/> : (postsData.length ? 
    postsData.map((post, i) => (
      <li key={post.id}>
        <Item onClick={() => navigate(`/product/${post.id}`)}>
          <Title level={3}>{post.title}</Title>
          <p>{post.content}</p>
        </Item>
        {i < postsData.length - 1 && <Divider />}
      </li>
    )) 
    : 
    (
    <li>
      <p>This user has no posts.</p>
    </li>
    ));

  const comments = loadingComments ? <Spin/> : (commentsData.length ? 
    commentsData.map((comment, i) => (
      <li key={comment.id}>
        <Item onClick={() => navigate(`/product/${comment.post_id}`)}>
          <p>{comment.content}</p>
        </Item>
        {i < commentsData.length - 1 && <Divider />}
      </li>
    )) 
    : 
    (
    <li>
      <p>This user has no comments.</p>
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
    const fetchPosts = async () => {
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

      } catch (error) {
        message.error("Failed to fetch posts.");
      } finally {
        setLoadingPosts(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/comments`, {
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setCommentsData(data);

      } catch (error) {
        message.error("Failed to fetch comments.");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchPosts();
    fetchComments();
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
