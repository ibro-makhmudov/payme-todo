import { createAction, props } from '@ngrx/store';
import {ITodo} from "../../interfaces/todo.interface";

export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: ITodo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);

export const addTodo = createAction(
    '[Todo] Add Todo',
    props<{ todo: ITodo }>()
    );

export const addTodoSuccess = createAction(
    '[Todo] Add Todo Success',
    props<{ todo: ITodo }>()
    );

export const addTodoFailure = createAction(
    '[Todo] Add Todo Failure',
    props<{ error: string }>()
    );

export const deleteTodo = createAction(
    '[Todo] Delete Todo',
    props<{ id: string }>()
    );

export const deleteTodoSuccess = createAction(
    '[Todo] Delete Todo Success',
    props<{ id: string }>()
    );

export const deleteTodoFailure = createAction(
    '[Todo] Delete Todo Failure',
    props<{ error: string }>()
    );

export const updateTodo = createAction(
    '[Todo] Update Todo',
    props<{ id: string, todo: ITodo }>()
    );

export const updateTodoSuccess = createAction(
    '[Todo] Update Todo Success',
    props<{ id: string, todo: ITodo }>()
    );

export const updateTodoFailure = createAction(
    '[Todo] Update Todo Failure',
    props<{ error: string }>()
    );

export const getTodo = createAction(
    '[Todo] Get Todo',
    props<{ id: string }>()
    );

export const getTodoSuccess = createAction(
    '[Todo] Get Todo Success',
    props<{ todo: ITodo }>()
    );

export const getTodoFailure = createAction(
    '[Todo] Get Todo Failure',
    props<{ error: string }>()
    );

