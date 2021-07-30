import { useState } from "react";
import { Input, Box } from "@chakra-ui/react";
import { Typography } from "@supabase/ui";
import { useStore } from "../../store/store";

export function TodoInput() {
  const { Text } = Typography;
  const addTodo = useStore((state) => state.addTodo);
  const errorMsg = useStore((state) => state.errorMsg);
  const [inputValue, setInputValue] = useState("");

  const handleTodo = (e) => {
    let todo = e.target.value.trim();
    setInputValue(todo);
    if (e.keyCode === 13 && todo.length > 0) {
      addTodo(todo);
      setInputValue("");
    }
  };

  return (
    <Box mb={4}>
      <Input
        placeholder="Add a new task"
        onChange={(e) => {
          handleTodo(e);
        }}
        onKeyDown={(e) => {
          handleTodo(e);
        }}
        value={inputValue}
      />
      {errorMsg && <Text>{errorMsg}</Text>}
    </Box>
  );
}
