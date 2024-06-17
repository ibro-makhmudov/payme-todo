import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IUserCredentials } from '@interfaces/user-credentials.interface';
import {ILoginResponse, IToken} from '@interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new BehaviorSubject<ILoginResponse | null>(null);

  private _api = '/api/auth';
  private _endpoints = {
    login: '/token/login/',
  };

  public constructor(private _http: HttpClient) {}

  public login(payload: IUserCredentials) {
    return this._http
      .post<ILoginResponse>(`${this._api}${this._endpoints.login}`, payload)
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(res.username, res.user_id, res.token);
        }),
      );
  }

  public getUserTokenFromLocalStorage() {
    const userData: ILoginResponse = JSON.parse(
      localStorage.getItem('userData') || '{}',
    );
    if (!userData) {
      return;
    }

    if (userData.token) {
      this.user.next(userData);
    }
  }

  public logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(
    username: string,
    user_id: string,
    token: IToken,
  ) {
    const user = {
      username,
      user_id,
      token,
    };
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }

    return throwError(() => errorMessage);
  }
}
