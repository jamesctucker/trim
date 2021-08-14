import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";

const createTodo = async (todo) => {
  const user = supabase.auth.user();
  const { data, error } = await supabase
    .from("todos")
    .insert({ task: todo.task, user_id: user.id })
    .single();
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("no data");
  }

  return data;
};

// TODO: set-up optimistic updates and error rollbacks
export default function useCreateTodo({ todo }) {
  const queryClient = useQueryClient();

  return useMutation("createTodo", () => createTodo(todo), {
    onSuccess: (data) => {
      queryClient.setQueryData("todos", (old) => [...old, data]);
    },
  });
}
