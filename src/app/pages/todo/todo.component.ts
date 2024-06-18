import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ITodo} from "./interfaces/todo.interface";
import {selectTodos} from "@store/todo/todo.selector";
import {Store} from "@ngrx/store";
import {AppState} from "@store/index";
import {addTodo, loadTodos} from "@store/todo/todo.actions";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
      `
        .list {
          list-style: none;
        }
        
        .gradient-custom {
          background: radial-gradient(50% 123.47% at 50% 50%, #94d0b6 0%, #9ed06f 100%),
          linear-gradient(121.28deg, #71b79e 0%, #67cbb5 100%),
          linear-gradient(360deg, #7a8cd0 0%, #8fff00 100%),
          radial-gradient(100% 164.72% at 100% 100%, #d3eee1 0%, #a9e8be 100%),
          radial-gradient(100% 148.07% at 0% 0%, #74bba4 0%, #82d06f 100%);
          background-blend-mode: screen, color-dodge, overlay, difference, normal;
          min-height: 100vh;
        }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit{
  public todoList$: Observable<ITodo[]> = this._store.select(selectTodos);
  public createTodoForm = this._fb.nonNullable.group({
    title: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
    completed: [false],
    user: 1
  });

  public constructor(
      private _fb: FormBuilder,
      private _store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.getTodos();
  }

  public getTodos(): void {
    this._store.dispatch(loadTodos());
  }

  public onCreateTodo(): void  {
    if (this.createTodoForm.invalid) {
      return;
    }

    if(this._isValidFormValue(this.createTodoForm.value)) {
      this._store.dispatch(addTodo({todo: this.createTodoForm.value}));
    }
  }

  private _isValidFormValue(data: Partial<ITodo>): data is ITodo {
    return 'title' in data && 'completed' in data && 'user' in data;
  }
}
