import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchMessages,
  markAsRead,
  updateMessages
} from "../services/apiMessages";

export function useMessages() {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages
  });

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: (chatIndex) => markAsRead(chatIndex),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    }
  });

  const { mutate: updateMessagesMutation } = useMutation({
    mutationFn: ({ chatIndex, inputValue }) =>
      updateMessages(chatIndex, inputValue),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    }
  });

  return {
    messages,
    isLoading,
    markAsReadMutation,
    updateMessagesMutation
  };
}
