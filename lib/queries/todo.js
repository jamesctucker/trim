import { supabase } from "../../utils/supabaseClient";

export const fetchTodos = async () => {
  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .filter("is_complete", "eq", false)
    .order("id", true);
  if (error) console.log("error", error);
  else setTodos(todos);
};
