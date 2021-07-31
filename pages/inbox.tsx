import { useEffect } from "react";
import { TodoList, TodoInput } from "../components/todos/index";
import useStore from "../store/useStore";
import { Todo } from "../lib/interfaces";

export default function Inbox() {
  const todos: Todo[] = useStore((state) => state.todos);
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
