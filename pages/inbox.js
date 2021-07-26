import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Typography } from "@supabase/ui";
import { supabase } from "../utils/supabaseClient";
import TodoList from "../components/todos/TodoList";

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
      .filter("is_complete", "eq", false)
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
      if (error) {
        setError(error.message);
      } else {
        setTodos([...todos, todo]);
      }
      setTodo("");
    }
  };

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
      <TodoList todos={todos} />
    </div>
  );
}
