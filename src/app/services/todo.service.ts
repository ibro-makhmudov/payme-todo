import { catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IResponse} from "../interfaces/response.interface";
import {ITodo} from "../interfaces/todo.interface";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _api = '/api/todo/';

  public constructor(private _http: HttpClient, private _toastrService: ToastrService) {}

  public getTodos() {
    return this._http.get<IResponse<ITodo[]>>(`${this._api}`).pipe(
      map((res) => res.results),
      catchError(this.handleError),
    );
  }

  public getTodoById(id: string) {
    return this._http
      .get<ITodo>(`${this._api}${id}/`)
      .pipe(catchError(this.handleError));
  }

  public createTodo(newTodo: ITodo) {
    return this._http
      .post<ITodo>(`${this._api}`, newTodo)
      .pipe(catchError(this.handleError));
  }

  public deleteTodo(id: string) {
    return this._http
      .delete(`${this._api}${id}/`)
      .pipe(catchError(this.handleError));
  }

  public updateTodo(id: string, updatedTodo: ITodo) {
    return this._http
      .put<IResponse<ITodo>>(`${this._api}${id}/`, updatedTodo)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }

    if (errorRes.error.detail) {
      errorMessage = errorRes.error.detail;
    }

    this._toastrService.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
