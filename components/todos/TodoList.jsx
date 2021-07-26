import Todo from "./Todo.jsx";
import { UnorderedList } from "@chakra-ui/react";

export default function TodoList({ todos }) {
  return (
    <div>
      <UnorderedList>
        {todos.map((todo) => (
          <Todo key={`t + ${todo.id}`} todo={todo} />
        ))}
      </UnorderedList>
    </div>
  );
}
