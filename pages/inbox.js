import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Typography } from "@supabase/ui";
import { supabase } from "../utils/supabaseClient";
import TodoList from "../components/todos/TodoList";
import { useStore } from "../store/store";

export default function Inbox() {
  const { Text } = Typography;
  const todos = useStore((state) => state.todos);
  const getTodos = useStore((state) => state.getTodos);
  const addTodo = useStore((state) => state.addTodo);
  const errorMsg = useStore((state) => state.errorMsg);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleTodo = (e) => {
    let todo = e.target.value.trim();
    if (e.keyCode === 13 && todo.length > 0) {
      addTodo(todo);
    }
  };

  return (
    <div>
      <h1>Inbox</h1>
      <Input
        placeholder="Add a task"
        onChange={(e) => {
          handleTodo(e);
        }}
        onKeyDown={(e) => {
          handleTodo(e);
        }}
      />
      {errorMsg && <Text>{errorMsg}</Text>}
      <TodoList todos={todos} />
    </div>
  );
}
