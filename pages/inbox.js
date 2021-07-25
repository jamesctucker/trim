import { useState, useEffect } from "react";
import { Input, UnorderedList, ListItem } from "@chakra-ui/react";
import { Typography } from "@supabase/ui";
import { supabase } from "../utils/supabaseClient";

export default function Inbox() {
  const user = supabase.auth.user();
  const { Text } = Typography;
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorText, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", true);
    if (error) console.log("error", error);
    else setTodos(todos);
  };

  const submitTodo = async (e) => {
    let task = e.target.value.trim();
    if (e.keyCode === 13 && task.length > 0) {
      e.preventDefault();
      let { data: todo, error } = await supabase
        .from("todos")
        .insert({ task, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
  };

  const todoList = todos.map((todo) => (
    <ListItem key={`t + ${todo.id}`}>{todo.task}</ListItem>
  ));
  return (
    <div>
      <h1>Inbox</h1>
      <Input
        placeholder="Add a task"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        onKeyDown={(e) => {
          submitTodo(e);
        }}
      />
      {errorText && <Text>{errorText}</Text>}
      <UnorderedList>{todoList}</UnorderedList>
    </div>
  );
}
