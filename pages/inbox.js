import { useState, useEffect } from "react";
import { Typography } from "@supabase/ui";
import { TodoList, TodoInput } from "../components/todos/index";
import { useStore } from "../store/store";

export default function Inbox() {
  const { Text } = Typography;
  const todos = useStore((state) => state.todos);
  const getTodos = useStore((state) => state.getTodos);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <TodoInput />
      <TodoList todos={todos} />
    </div>
  );
}
