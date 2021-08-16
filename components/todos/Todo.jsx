import { useState, useRef, useEffect } from "react";
import {
  ListItem,
  Flex,
  Checkbox,
  Text,
  Input,
  Textarea,
  useOutsideClick,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import useCompleteTodo from "../../hooks/useCompleteTodo";
import useUpdateTodo from "../../hooks/useUpdateTodo";

export function Todo({ todo }) {
  const ref = useRef();
  const [title, setTitle] = useState(todo.title);
  const [note, setNote] = useState(todo.note);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [updated, setUpdated] = useState(false);

  const completeTodoMutation = useCompleteTodo({ todo });
  function handleCheck(e) {
    if (e.target.checked) {
      setTimeout(() => {
        completeTodoMutation.mutate();
      }, 400);
    }
  }

  useOutsideClick({
    ref: ref,
    handler: () => {
      setShowMoreOptions(false);
      setTitle(todo.title);
      setNote(todo.note);
    },
  });

  function checkMatching() {
    if (title !== todo.title || note !== todo.note) {
      setUpdated(true);
      return;
    }
    setUpdated(false);
  }

  useEffect(() => {
    checkMatching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, note]);

  const updateTodoMutation = useUpdateTodo({
    todo: { id: todo.id, title: title, note: note },
  });

  async function saveUpdate() {
    await updateTodoMutation.mutate();
    setShowMoreOptions(false);
  }

  return (
    <>
      {!showMoreOptions && (
        <ListItem onDoubleClick={() => setShowMoreOptions(true)}>
          <Flex direction="row" m={2}>
            <Checkbox
              onChange={(e) => {
                handleCheck(e);
              }}
              mr={2}
            />
            <Text fontSize="md">{title}</Text>
            {/* {errorMsg && <p>{errorMsg}</p>} */}
          </Flex>
        </ListItem>
      )}
      {showMoreOptions && (
        <Flex
          ref={ref}
          boxShadow="md"
          p="4"
          my="4"
          rounded="md"
          border="1px"
          borderColor="gray.600"
          flexDirection="column"
        >
          <Input
            placeholder={todo.title}
            variant="unstyled"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <Textarea
            placeholder="Notes"
            variant="unstyled"
            onChange={(e) => {
              setNote(e.target.value);
            }}
            value={note}
          />
          {updated && (
            <ButtonGroup variant="outline" spacing="6">
              <Button
                onClick={() => saveUpdate()}
                colorScheme="blue"
                isLoading={updateTodoMutation.isLoading}
              >
                Save
              </Button>
              <Button>Cancel</Button>
            </ButtonGroup>
          )}
        </Flex>
      )}
    </>
  );
}
