import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from "./todo.component";
import { TodoItemComponent } from './todo-item/todo-item.component';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    title: 'Payme Todo | All todos'
  }
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoItemComponent,
    EditTodoDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {}