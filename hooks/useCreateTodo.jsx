import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";

const createTodo = async (todo) => {
  const user = supabase.auth.user();
  const { data, error } =
    (await supabase.from) <
    Todo >
    "todos".insert({ task: todo.task, user_id: user.id }).single();
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("no data");
  }

  return data;
};

export default function useCreateTodo({ todo }) {
  const queryClient = useQueryClient();

  return useMutation("createTodo", () => createTodo(todo), {
    // onMutate: async (data) => {
    //   // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    //   await queryClient.cancelQueries("todos");
    //   // Snapshot the previous value
    //   const previousTodos = queryClient.getQueryData("todos");
    //   // Optimistically update to the new value
    //   queryClient.setQueryData("todos", (oldTodos: any) => [...oldTodos, data]);
    //   return { previousTodos };
    // },
    // // If the mutation fails, use the context returned from onMutate to roll back
    // onError: (err, newTodo, context: any) => {
    //   queryClient.setQueryData("todos", context.previousTodos);
    // },
    // // Always refetch after error or success:
    // onSettled: () => {
    //   queryClient.invalidateQueries("todos");
    // },
  });
}
