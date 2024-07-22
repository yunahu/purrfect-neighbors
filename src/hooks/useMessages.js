import { gql, useMutation, useQuery } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      user
      messages {
        sender
        content
        sendTime
        read
      }
    }
  }
`;

const MARK_AS_READ = gql`
  mutation ($chatIndex: Int!) {
    markAsRead(chatIndex: $chatIndex) {
      user
      messages {
        sender
        content
        sendTime
        read
      }
    }
  }
`;

const UPDATE_MESSAGES = gql`
  mutation ($chatIndex: Int!, $inputValue: String!) {
    updateMessages(chatIndex: $chatIndex, inputValue: $inputValue) {
      user
      messages {
        sender
        content
        sendTime
        read
      }
    }
  }
`;

export function useMessages() {
  const { data, loading, error } = useQuery(GET_MESSAGES);
  const [markAsRead] = useMutation(MARK_AS_READ, {
    refetchQueries: [{ query: GET_MESSAGES }]
  });
  const [updateMessages] = useMutation(UPDATE_MESSAGES, {
    refetchQueries: [{ query: GET_MESSAGES }]
  });

  const messages = data?.messages || [];

  return {
    messages,
    loading,
    error,
    markAsRead,
    updateMessages
  };
}
