import {Component, Input, OnInit} from '@angular/core';
import {ITodo} from "../interfaces/todo.interface";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "@store/index";
import {updateTodo} from "@store/todo/todo.actions";

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styles: [`
    .modal {
      position: fixed; /* Stay in place */
      z-index: 10; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

  `]
})
export class EditTodoDialogComponent implements OnInit {
  @Input() todo!: ITodo;
  public opened = false;
  public editTodoForm = this._fb.nonNullable.group({
    title: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
    completed: [false],
    user: 1
  });
  constructor(
      private _fb: FormBuilder,
      private _store: Store<AppState>
  ) {}

  ngOnInit():void {
    this.editTodoForm.patchValue(this.todo);
  }

  public onEditTodo(): void  {
    if(this._isValidFormValue(this.editTodoForm.value)) {
      console.log('works')
      this._store.dispatch(updateTodo({
        id: this.todo.id!,
        todo: this.editTodoForm.value
      }));
    }
  }

  private _isValidFormValue(data: Partial<ITodo>): data is ITodo {
    return 'title' in data && 'completed' in data && 'user' in data;
  }

  open():void {
    this.opened = true;
  }

  close():void {
    this.opened = false;
  }
}
