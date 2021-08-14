import { useState } from "react";
import useCreateTodo from "../../hooks/useCreateTodo";
import { Input, Box, Text } from "@chakra-ui/react";

export function TodoInput() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const createTodoMutation = useCreateTodo({
    todo: { task: task, description: description },
  });

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

      {createTodoMutation.isError && (
        <Text>{createTodoMutation.error.message}</Text>
      )}
    </Box>
  );
}
