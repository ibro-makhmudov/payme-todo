import {Component, Input} from '@angular/core';
import {ITodo} from "../interfaces/todo.interface";
import {deleteTodo, updateTodo} from "@store/todo/todo.actions";
import {AppState} from "@store/index";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  constructor(private _store: Store<AppState>) {}

  public onDelete(todo: ITodo): void {
    this._store.dispatch(deleteTodo({id: todo.id!}))
  }

  public onTodoStatus(todo: ITodo): void {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    }

    this._store.dispatch(updateTodo({
      id: todo.id!,
      todo: updatedTodo
    }))
  }
}
