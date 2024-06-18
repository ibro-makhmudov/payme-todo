import {Component, Input, ViewChild} from '@angular/core';
import {ITodo} from "../interfaces/todo.interface";
import {deleteTodo, updateTodo} from "@store/todo/todo.actions";
import {AppState} from "@store/index";
import {Store} from "@ngrx/store";
import {EditTodoDialogComponent} from "../edit-todo-dialog/edit-todo-dialog.component";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  @ViewChild('modal') modal: EditTodoDialogComponent;
  constructor(private _store: Store<AppState>) {}

  public onTodoStatusUpdate(todo: ITodo): void {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    }

    this._store.dispatch(updateTodo({
      id: todo.id!,
      todo: updatedTodo
    }))
  }

  public onDelete(todo: ITodo): void {
    this._store.dispatch(deleteTodo({id: todo.id!}))
  }

  public onEditTodo() {
    this.modal.open();
  }
}
