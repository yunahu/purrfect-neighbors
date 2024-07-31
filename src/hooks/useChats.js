import { gql, useMutation, useQuery } from "@apollo/client";

const GET_CHATS = gql`
  query GetChats {
    chats {
      recipient {
        id
        name
      }
      unread
    }
  }
`;

export const GET_CHAT = gql`
  query GetChat($recipientId: Int) {
    chat(recipientId: $recipientId) {
      recipient {
        id
        name
      }
      sender {
        id
        name
      }
      lastSeen
      messages(recipientId: $recipientId) {
        senderId
        recipientId
        content
        createdAt
      }
    }
  }
`;

const UPDATE_LAST_SEEN = gql`
  mutation ($recipientId: Int!) {
    updateLastSeen(recipientId: $recipientId)
  }
`;

const SEND_NEW_MESSAGE = gql`
  mutation ($recipientId: Int!, $content: String!) {
    sendNewMessage(recipientId: $recipientId, content: $content)
  }
`;

export const useChats = () => {
  const { data, loading, error } = useQuery(GET_CHATS);
  const chats = data?.chats || [];
  const [updateLastSeen] = useMutation(UPDATE_LAST_SEEN);
  const [sendNewMessage] = useMutation(SEND_NEW_MESSAGE);

  return {
    chats,
    loading,
    error,
    updateLastSeen,
    sendNewMessage
  };
};
