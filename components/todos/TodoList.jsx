import { Todo } from "./index.js";
import { List } from "@chakra-ui/react";

export function TodoList({ todos }) {
  return (
    <div>
      <List>
        {todos.map((todo) => (
          <Todo key={`t + ${todo.id}`} todo={todo} />
        ))}
      </List>
    </div>
  );
}
