import { useQuery } from "react-query";
import { supabase } from "../utils/supabaseClient";

const getTodos = async () => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .filter("is_complete", "eq", false)
    .order("id", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("no todos");
  }

  return data;
};

export default function useTodos() {
  return useQuery("todos", () => getTodos());
}
