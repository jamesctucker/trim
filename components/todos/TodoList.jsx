import { Todo } from "./index.js";
import { UnorderedList } from "@chakra-ui/react";

export function TodoList({ todos }) {
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
