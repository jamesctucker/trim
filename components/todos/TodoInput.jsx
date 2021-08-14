import { useState } from "react";
import useCreateTodo from "../../hooks/useCreateTodo";
import { Input, Box } from "@chakra-ui/react";

export function TodoInput() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const createTodoMutation = useCreateTodo({
    todo: { task: task, description: description },
  });

  // TODO: figure out how to type a React keydown event
  const handleTask = (e) => {
    let todo = e.target.value;
    setTask(todo);
    if (e.keyCode === 13 && todo.length > 0) {
      todo.trim();
      createTodoMutation.mutate();
      setTask("");
    }
  };

  return (
    <Box mb={4}>
      <Input
        placeholder="Add a new task"
        onChange={(e) => {
          handleTask(e);
        }}
        onKeyDown={(e) => {
          handleTask(e);
        }}
        value={task}
      />
      {/* {errorMsg && <Text>{errorMsg}</Text>} */}
    </Box>
  );
}
