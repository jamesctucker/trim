import { useState } from "react";
import { Input, Box } from "@chakra-ui/react";
import { Typography } from "@supabase/ui";
import useStore from "../../store/useStore";

export function TodoInput() {
  const { Text } = Typography;
  const addTodo = useStore((state) => state.addTodo);
  const errorMsg = useStore((state) => state.errorMsg);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  // TODO: figure out how to type a React keydown event
  const handleTask = (e: any) => {
    let todo = e.target.value;
    setTask(todo);
    if (e.keyCode === 13 && todo.length > 0) {
      todo.trim();
      addTodo({
        task: task,
        description: description,
      });
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
      {errorMsg && <Text>{errorMsg}</Text>}
    </Box>
  );
}
