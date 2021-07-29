import { Input } from "@chakra-ui/react";
import { Typography } from "@supabase/ui";
import { useStore } from "../../store/store";

export function TodoInput() {
  const { Text } = Typography;
  const addTodo = useStore((state) => state.addTodo);
  const errorMsg = useStore((state) => state.errorMsg);

  const handleTodo = (e) => {
    let todo = e.target.value.trim();
    if (e.keyCode === 13 && todo.length > 0) {
      addTodo(todo);
    }
  };

  return (
    <div>
      <Input
        placeholder="Add a task"
        onChange={(e) => {
          handleTodo(e);
        }}
        onKeyDown={(e) => {
          handleTodo(e);
        }}
      />
      {errorMsg && <Text>{errorMsg}</Text>}
    </div>
  );
}