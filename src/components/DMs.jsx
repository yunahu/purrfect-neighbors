import { useLazyQuery } from "@apollo/client";
import { Badge, Button, Input, List } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { GET_CHAT, useChats } from "../hooks/useChats";
import { socket } from "../socket";
import UserAvatar from "./UserAvatar";

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

const sortChatByCreatedAt = (chat) => {
  const compare = (m1, m2) => {
    if (m1.createdAt < m2.createdAt) {
      return -1;
    }
    if (m1.createdAt > m2.createdAt) {
      return 1;
    }
    return 0;
  };

  return {
    ...chat,
    messages: [...chat.messages].sort(compare)
  };
};

function DMs() {
  const { chats, loading, error, updateLastSeen, sendNewMessage } = useChats();
  const [currentChat, setCurrentChat] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const newestMessage = useRef(null);
  const [getChat, { loading: chatLoading, error: chatError, data }] =
    useLazyQuery(GET_CHAT);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected!");
    };

    const onNewMessageReceived = (params) => {
      console.log("server received a new message", params);
    };

    socket.on("connect", onConnect);
    socket.on("newMessageReceived", onNewMessageReceived);

    return () => {
      socket.off("connect", onConnect);
      socket.off("newMessageReceived", onNewMessageReceived);
    };
  }, []);

  let chat = data?.chat || [];
  if (chat.messages) {
    const sorted = sortChatByCreatedAt(chat);
    chat = sorted;
  }

  const handleUserClick = async (chat) => {
    await getChat({ variables: { recipientId: chat.recipient.id } });
    setCurrentChat(chat);
    updateLastSeen({ variables: { recipientId: chat.recipient.id } });
  };

  const handleSendMsg = async () => {
    if (inputValue.trim() === "") return;
    try {
      await sendNewMessage({
        variables: { recipientId: chat.recipient.id, content: inputValue }
      });
      // newestMessage.current?.scrollIntoView({ behavior: "smooth" });
      setInputValue("");
      socket.emit("newMessage", {
        recipientId: chat.recipient.id,
        content: inputValue
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // const scrollToBottom = () => {
  //   newestMessage.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   if (messages && messages[currentChat]) {
  //     scrollToBottom();
  //     markAsRead({ variables: { chatIndex: currentChat } });
  //   }
  // }, [currentChat, messages, markAsRead]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!chats || chats.length === 0) return <p>No chats found</p>;

  return (
    <Layout>
      <Sider>
        <UserList>
          {chats.map((chat) => (
            <User
              key={chat.recipient.id}
              className={
                currentChat?.recipient.id === chat.recipient.id ? "active" : ""
              }
              onClick={() => handleUserClick(chat)}
            >
              <UserAvatar size="small" name={chat.recipient.name} gap={6} />
              {chat.unread > 0 ? (
                <Badge count={chat.unread} offset={[10, 0]}>
                  <span>{chat.recipient.name}</span>
                </Badge>
              ) : (
                <span>{chat.recipient.name}</span>
              )}
            </User>
          ))}
        </UserList>
      </Sider>
      <MessageContainer>
        {chat && (
          <MessageList
            itemLayout="horizontal"
            dataSource={chat.messages}
            renderItem={(message) => (
              <List.Item
                key={message.createdAt}
                // ref={
                //   index === chat.messages.length - 1
                //     ? newestMessage
                //     : null
                // }
              >
                <List.Item.Meta
                  title={
                    message.recipientId === chat.recipient.id
                      ? chat.sender.name
                      : chat.recipient.name
                  }
                  description={message.content}
                />
              </List.Item>
            )}
          />
        )}
        <InputContainer>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMsg()
            }
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
