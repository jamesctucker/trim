import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";

const completeTodo = async (todo) => {
  const { data, error } = await supabase
    .from("todos")
    .update({ is_complete: true })
    .eq("id", todo.id)
    .single();
  if (error) {
    set({ errorMsg: error.message });
    return;
  }

  return data;
};

// TODO: set-up optimistic updates and error rollbacks
export default function useCompleteTodo({ todo }) {
  const queryClient = useQueryClient();

  return useMutation("completeTodo", () => completeTodo(todo), {
    onSuccess: (data) => {
      queryClient.setQueryData("todos", (old) => {
        //   remove completed todo from cache
        const updated = old.filter((item) => item.id !== data.id);
        return updated;
      });
    },
  });
}
