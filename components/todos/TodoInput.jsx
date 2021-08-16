import { useState } from "react";
import useCreateTodo from "../../hooks/useCreateTodo";
import { Input, Box, Text } from "@chakra-ui/react";

export function TodoInput() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const createTodoMutation = useCreateTodo({
    todo: { title: title, note: note },
  });

  const handleTitle = (e) => {
    let todo = e.target.value;
    setTitle(todo);
    if (e.keyCode === 13 && todo.length > 0) {
      todo.trim();
      createTodoMutation.mutate();
      setTitle("");
    }
  };

  return (
    <Box mb={4}>
      <Input
        placeholder="Add a new title"
        onChange={(e) => {
          handleTitle(e);
        }}
        onKeyDown={(e) => {
          handleTitle(e);
        }}
        value={title}
      />

      {createTodoMutation.isError && (
        <Text>{createTodoMutation.error.message}</Text>
      )}
    </Box>
  );
}
