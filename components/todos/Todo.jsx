import { ListItem, Flex, Checkbox, Text } from "@chakra-ui/react";
import { useStore } from "../../store/store";

export function Todo({ todo }) {
  const completeTodo = useStore((state) => state.completeTodo);
  const getTodos = useStore((state) => state.getTodos);
  const errorMsg = useStore((state) => state.errorMsg);

  const handleCheck = (e) => {
    if (e.target.checked) {
      setTimeout(() => {
        completeTodo(todo).then(() => getTodos());
      }, 400);
    }
  };

  return (
    <>
      <ListItem>
        <Flex direction="row" m={2}>
          <Checkbox
            onChange={(e) => {
              handleCheck(e);
            }}
            mr={2}
          />
          <Text fontSize="md">{todo.task}</Text>
          {errorMsg && <p>{errorMsg}</p>}
        </Flex>
      </ListItem>
    </>
  );
}
