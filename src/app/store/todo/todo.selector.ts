import { AppState } from "@store/index";

export const selectTodos = (state: AppState) => state.todo.todos;
export const selectTodo = (state: AppState) => state.todo.todo;