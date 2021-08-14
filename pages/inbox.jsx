import { TodoList, TodoInput } from "../components/todos/index";
import useTodos from "../hooks/useTodos";
import { Spinner } from "@chakra-ui/react";

export default function Inbox() {
  const { data: todos, isLoading } = useTodos();

  return (
    <div>
      <TodoInput />
      {isLoading ? <Spinner /> : <TodoList todos={todos} />}
    </div>
  );
}
