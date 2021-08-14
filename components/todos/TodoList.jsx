import { Todo as TodoComponent } from "./index";
import { List } from "@chakra-ui/react";

export const TodoList = ({ todos }) => {
  return (
    <div>
      {todos && (
        <List>
          {todos.map((todo) => (
            <TodoComponent key={`t + ${todo.id}`} todo={todo} />
          ))}
        </List>
      )}
    </div>
  );
};
