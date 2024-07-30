import { useState, useEffect } from "react";
import { Badge, Divider, Tabs, Typography, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

import ContentBox from "../components/ContentBox";
import DMs from "../components/DMs";

import styled from "styled-components";

const { Title } = Typography;

const Item = styled.div`
  padding: 8px;
  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
    cursor: pointer;
  }
`;

function Messages() {
  const navigate = useNavigate();

  const [commentsData, setCommentsData] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const comments = loadingComments ? <Spin/> : (commentsData.map((comment, i) => (
    <li key={comment.id}>
      <Item onClick={() => handleCommentClick(comment.id, comment.post_id)}>
        <Title level={3}>{comment.post_title}</Title>
        <p>{comment.content}</p>
      </Item>
      {i < commentsData.length - 1 && <Divider />}
    </li>
  )));

  const items = [
    {
      key: "1",
      label: <Badge count={0}>Direct messages</Badge>,
      children: <DMs />
    },
    {
      key: "2",
      label: <Badge dot={commentsData.length > 0}>Comments</Badge>,
      children: <ul>{comments}</ul>
    }
  ];

  const handleCommentClick = async (commentId, postId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/notifications/read`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark comment as read.");
      }

      navigate(`/product/${postId}`);
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/notifications`, {
          method: "GET",
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments.');
        }

        const data = await response.json();
        setCommentsData(data);

      } catch (error) {
        message.error("Unable to fetch comment notifications.");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <Title level={1}>Messages</Title>
      <ContentBox>
        <Tabs defaultActiveKey="1" items={items} />
      </ContentBox>
    </>
  );
}

export default Messages;
