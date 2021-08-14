import { ListItem, Flex, Checkbox, Text } from "@chakra-ui/react";
import useCompleteTodo from "../../hooks/useCompleteTodo";

export function Todo({ todo }) {
  const completeTodoMutation = useCompleteTodo({ todo });
  const handleCheck = (e) => {
    if (e.target.checked) {
      setTimeout(() => {
        completeTodoMutation.mutate();
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
          {/* {errorMsg && <p>{errorMsg}</p>} */}
        </Flex>
      </ListItem>
    </>
  );
}
