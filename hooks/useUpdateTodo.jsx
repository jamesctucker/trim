import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";

const updateTodo = async (todo) => {
  const { data, error } = await supabase
    .from("todos")
    .update({ title: todo.title, note: todo.note })
    .eq("id", todo.id)
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
export default function useUpdateTodo({ todo }) {
  const queryClient = useQueryClient();

  return useMutation("updateTodo", () => updateTodo(todo), {
    onSuccess: (data) => {
      queryClient.setQueryData(["todos", { id: data.id }], data);
    },
  });
}
