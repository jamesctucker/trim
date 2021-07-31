import { useState, useEffect } from "react";
import { TodoList, TodoInput } from "../components/todos/index";
import useStore from "../store/useStore";

export default function Inbox() {
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
