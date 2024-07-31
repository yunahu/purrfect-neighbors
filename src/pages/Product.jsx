import { Button, Divider, Input, Space, Tooltip, Typography, Spin, message } from "antd";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { LuArrowUp, LuMapPin } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useSearch } from "../context/useSearch"

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
  const { setGeolocation, setFilter } = useSearch();
  const { id } = useParams();
  const { user } = useAuth();

  const currentUser = user ? user.name : "Guest";

  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState("");

  const [post, setPost] = useState();

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
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
        const data = await response.json();

        const newComment = {
          id: data.commentId,
          commentBy: currentUser,
          commentDate: new Date().toISOString(),
          content: comment
        };

        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, newComment]
        }));
        setComment("");
        message.success("Comment submitted successfully!");
      } else {
        message.error("Failed to submit comment.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const handleMapPinClick = () => {
    if (post) {
      setGeolocation((prev) => ({...prev, latitude: post.latitude, longitude: post.longitude}));
      setFilter((prev) => ({ ...prev, selection:"products" }));
      navigate(`/explore`);
    }
  };

  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>Pet Product</Title>
      </Space>
      <ContentBox>
        { loading ? <Spin/> 
        : 
        ( post ? <>
          <Space direction="vertical">
            <Title level={2}>
              {id}: {post.title}
            </Title>
            <Space>
              <UserAvatar size="large" name={post.postBy} />
              <Title level={5}>{post.postBy}</Title>
              <Text type="secondary">{timeAgo(post.postDate)}</Text>
            </Space>
            <Text>{post.description}</Text>
            <Text type="secondary" onClick={handleMapPinClick} style={{ cursor: 'pointer' }} >
              <LuMapPin /> {post.location}
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
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <Divider style={{ margin: "12px 0" }} />
                <Comment>
                  <UserAvatar name={comment.commentBy} gap={8} />
                  <Space direction="vertical">
                    <Space>
                      <Text>{comment.commentBy}</Text>
                      <Text type="secondary">{timeAgo(comment.commentDate)}</Text>
                    </Space>
                    <Text>{comment.content}</Text>
                  </Space>
                </Comment>
              </div>
            ))}
          </Space>
        </>
        :
        <Text type="danger">Failed to load post.</Text>
        )}
      </ContentBox>
    </>
  );
}

export default Product;
