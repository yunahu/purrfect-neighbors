import { Button, Divider, Input, Space, Tooltip, Typography, message } from "antd";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { LuArrowUp, LuMapPin } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Back from "../components/Back";
import ContentBox from "../components/ContentBox";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../context/useAuth";

const { Title, Text } = Typography;

const Comment = styled.div`
  border-radius: var(--border-radius-md);
  padding: 8px;
  display: grid;
  grid-template-columns: 3.2rem 1fr;
  gap: 1rem;
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const currentUser = user ? user.name : "Guest";
  const [comment, setComment] = useState("");

  const [post, setPost] = useState({
    title: "Post 1",
    description: "Content of Post 1",
    postBy: "User 1",
    postDate: "2024-07-01T00:00:00Z",
    location: "Vancouver, BC",
    comments: [
      {
        commentBy: "User 2",
        commentDate: "2024-07-02T00:00:00Z",
        content: "Comment 1"
      },
      {
        commentBy: "User 3",
        commentDate: "2024-07-03T00:00:00Z",
        content: "Comment 2"
      }
    ]
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/donations/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        message.error("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

  const { title, description, postBy, postDate, location, comments } = post;

  const timeAgo = (date) => {
    if (!date) return null;
    return formatDistanceToNow(parseISO(date), {
      addSuffix: true
    });
  };

  const handleSubmitComment = async () => {
    if (!user) {
      // Can show a notification before redirecting
      navigate(`/signin?redirectUrl=/product/${id}`);
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/donations/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ content: comment })
      });

      if (response.ok) {
        const newComment = {
          commentBy: currentUser,
          commentDate: new Date().toISOString(),
          content: comment
        };

        setPost({
          ...post,
          comments: [...comments, newComment]
        });
        setComment("");
        message.success("Comment submitted successfully!");
      } else {
        message.error("Failed to submit comment.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>Pet Product</Title>
      </Space>
      <ContentBox>
        <Space direction="vertical">
          <Title level={2}>
            {id}: {title}
          </Title>
          <Space>
            <UserAvatar size="large" name={postBy} />
            <Title level={5}>{postBy}</Title>
            <Text type="secondary">{timeAgo(postDate)}</Text>
          </Space>
          <Text>{description}</Text>
          <Text type="secondary">
            <LuMapPin /> {location}
          </Text>
        </Space>
        <Space direction="vertical">
          <Input
            placeholder="Add a comment"
            size="large"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            suffix={
              <Tooltip title="Submit comment">
                <Button
                  icon={<LuArrowUp />}
                  aria-label="Click to submit comment"
                  onClick={handleSubmitComment}
                  disabled={comment === null || comment.trim() === ""}
                />
              </Tooltip>
            }
          />
          {comments.map((comment) => (
            <>
              <Divider style={{ margin: "12px 0" }} />
              <Comment key={comment.commentDate}>
                <UserAvatar name={comment.commentBy} gap={8} />
                <Space direction="vertical">
                  <Space>
                    <Text>{comment.commentBy}</Text>
                    <Text type="secondary">{timeAgo(comment.commentDate)}</Text>
                  </Space>
                  <Text>{comment.content}</Text>
                </Space>
              </Comment>
            </>
          ))}
        </Space>
      </ContentBox>
    </>
  );
}

export default Product;
