import { createReducer, on } from '@ngrx/store';

import * as TodoActions from '@store/todo/todo.actions';
import {ITodo} from "../../pages/todo/interfaces/todo.interface";

enum Status {
  pending = 'pending',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export interface TodoState {
  todos: ITodo[] | [];
  status: Status;
  error: any;
  todo?: ITodo;
}

export const initialState: TodoState = {
  todos: [],
  status: Status.pending,
  error: '',
  todo: undefined
};

export const todoReducer = createReducer(
  initialState,
  
    on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
      ...state,
      todos: todos,
      status: Status.success,
      error: null,
    })),
    on(TodoActions.loadTodosFailure, (state, { error }) => ({
      ...state,
      status: Status.error,
      error,
    })),
  
    on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    status: Status.success,
    error: '',
    })),
    on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error,
    })),

    on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos?.filter((todo) => todo.id !== id) || [],
    status: Status.success,
    error: '',
    })),
    on(TodoActions.deleteTodoFailure, (state, { error }) => ({  
    ...state,
    status: Status.error,
    error,
    })),

    on(TodoActions.updateTodoSuccess, (state, { id, todo }) => ({
    ...state,
    todos: state.todos?.map((t) => t.id === id ? todo : t) || [],
    status: Status.success,
    error: '',
    })),
    on(TodoActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error,
    })),

    
    on(TodoActions.getTodoSuccess, (state, { todo }) => ({
    ...state,
    todo: todo,
    status: Status.success,
    error: '',
    })),

    on(TodoActions.getTodoFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error,
    }))
);
