import { GetState, SetState } from "zustand";
import { supabase } from "../utils/supabaseClient";
import { MyState } from "./useStore";

const user = supabase.auth.user();

export interface TodoSlice {
  todos: Todo[];
  errorMsg: string | null;
  getTodos: () => void;
}

interface Todo {
  id?: number;
  user_id?: string;
  task: string;
  description?: string;
  is_complete?: boolean;
  inserted_at?: string;
}

const createTodoSlice = (set: SetState<MyState>, get: GetState<MyState>) => ({
  todos: [],
  errorMsg: null,
  getTodos: async () => {
    const { data, error } = await supabase
      .from<Todo>("todos")
      .select("*")
      .filter("is_complete", "eq", false)
      .order("id", { ascending: false });
    if (error) {
      set({ errorMsg: error.message });
      return;
    }
    set({ todos: data! });
  },
  addTodo: async (todo: Todo) => {
    const { data, error } = await supabase
      .from<Todo>("todos")
      .insert({ task: todo.task, user_id: user!.id })
      .single();
    if (error) {
      set({ errorMsg: error.message });
      return;
    }
    set((state) => ({ todos: [...state.todos, data!] }));
  },
  completeTodo: async (todo: Todo) => {
    const { data, error } = await supabase
      .from<Todo>("todos")
      .update({ is_complete: true })
      .eq("id", todo.id)
      .single();
    if (error) {
      set({ errorMsg: error.message });
      return;
    }
  },
});

export default createTodoSlice;
