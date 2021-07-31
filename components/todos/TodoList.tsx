import { Todo as TodoComponent } from "./index";
import { List } from "@chakra-ui/react";
import { Todo } from "../../lib/interfaces";

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <div>
      <List>
        {todos.map((todo) => (
          <TodoComponent key={`t + ${todo.id}`} todo={todo} />
        ))}
      </List>
    </div>
  );
};
