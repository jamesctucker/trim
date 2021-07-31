import create from "zustand";
import { devtools } from "zustand/middleware";
import createTodoSlice, { TodoSlice } from "./todoSlice";

export type MyState = TodoSlice;

const useStore = create<MyState>(
  devtools((set, get) => ({
    ...createTodoSlice(set, get),
  }))
);

export default useStore;
