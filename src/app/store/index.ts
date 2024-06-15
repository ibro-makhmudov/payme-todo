import { ActionReducerMap } from "@ngrx/store";

import { TodoState, todoReducer } from "@store/todo/todo.reducer";

export interface AppState {
    todo: TodoState
}

export const reducers: ActionReducerMap<AppState> = {
        todo: todoReducer
}