import { ListItem, Flex } from "@chakra-ui/react";
import { Check } from "react-feather";
import { supabase } from "../../utils/supabaseClient";

export default function Todo({ todo }) {
  const completeTodo = async () => {
    console.log("completing");
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ is_complete: true })
        .eq("id", todo.id)
        .single();
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Flex direction="row">
        <ListItem>{todo.task}</ListItem>
        <button onClick={(e) => completeTodo()}>
          <Check />
        </button>
      </Flex>
    </div>
  );
}
