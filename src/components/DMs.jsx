import { Avatar, Badge, Button, Input, List } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useMessages } from "../hooks/useMessages";

const { TextArea } = Input;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
`;

const Sider = styled.aside`
  background: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow-y: auto;
`;

const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  gap: 1rem;
`;

const User = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;
  cursor: pointer;

  &:hover,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-brand-50);
    border-radius: var(--border-radius-sm);
  }
`;

const MessageContainer = styled.div`
  padding: 1.2rem;
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  height: 50vh;
`;

const MessageList = styled(List)`
  flex-grow: 1;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
`;

function DMs() {
  const { messages, loading, error, markAsRead, updateMessages } =
    useMessages();

  const [currentChat, setCurrentChat] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const newestMessage = useRef(null);

  const handleUserClick = (index) => {
    setCurrentChat(index);
    markAsRead({ variables: { chatIndex: index } });
  };

  const handleSendMsg = async () => {
    if (inputValue.trim() === "") return;
    // console.log(currentChat, inputValue);
    try {
      await updateMessages({
        variables: { chatIndex: currentChat, inputValue }
      });
      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const countUnread = (chat) => {
    return chat.messages.filter((msg) => !msg.read).length;
  };

  const scrollToBottom = () => {
    newestMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages && messages[currentChat]) {
      scrollToBottom();
      markAsRead({ variables: { chatIndex: currentChat } });
    }
  }, [currentChat, messages, markAsRead]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!messages || messages.length === 0) return <p>No messages found</p>;

  return (
    <Layout>
      <Sider>
        <UserList>
          {messages.map((message, index) => (
            <User
              key={message.user}
              className={currentChat === index ? "active" : ""}
              onClick={() => handleUserClick(index)}
            >
              <Avatar size="small">{message.user[0]}</Avatar>
              {countUnread(message) > 0 ? (
                <Badge count={countUnread(message)} offset={[10, 0]}>
                  <span>{message.user}</span>
                </Badge>
              ) : (
                <span>{message.user}</span>
              )}
            </User>
          ))}
        </UserList>
      </Sider>
      <MessageContainer>
        <MessageList
          itemLayout="horizontal"
          dataSource={messages[currentChat].messages}
          renderItem={(message, index) => (
            <List.Item
              key={index}
              ref={
                index === messages[currentChat].messages.length - 1
                  ? newestMessage
                  : null
              }
            >
              <List.Item.Meta
                title={message.sender}
                description={message.content}
              />
            </List.Item>
          )}
        />
        <InputContainer>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            autoSize
          />
          <Button type="primary" onClick={handleSendMsg}>
            Send
          </Button>
        </InputContainer>
      </MessageContainer>
    </Layout>
  );
}

export default DMs;
