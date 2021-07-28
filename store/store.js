import create from "zustand";
import { devtools } from "zustand/middleware";
import { supabase } from "../utils/supabaseClient";

const user = supabase.auth.user();

const createTodoSlice = (set) => ({
  todos: [],
  errorMsg: null,
  getTodos: async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .filter("is_complete", "eq", false)
      .order("id", true);
    if (error) {
      set({ errorMsg: error.message });
      return;
    }
    set({ todos: data });
  },
  addTodo: async (todo) => {
    const { data, error } = await supabase
      .from("todos")
      .insert({ task: todo, user_id: user.id })
      .single();
    if (error) {
      set({ errorMsg: error.message });
      return;
    }
    set((state) => ({ todos: [...state.todos, data] }));
  },
});

export const useStore = create(
  devtools((set, get) => ({
    ...createTodoSlice(set, get),
  }))
);
