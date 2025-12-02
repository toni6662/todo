import {create} from "zustand";
import { Todo } from "../types/global";

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  removeTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],

  setTodos: (todos) => set({ todos }),

  addTodo: (todo) => set({ todos: [...get().todos, todo] }),

  updateTodo: (id, updatedTodo) =>
    set({
      todos: get().todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ),
    }),

  removeTodo: (id) =>
    set({
      todos: get().todos.filter((todo) => todo.id !== id),
    }),
}));