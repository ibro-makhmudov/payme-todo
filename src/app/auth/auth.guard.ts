import { map, Observable, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { AuthService } from '@auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  public constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) {}

  canMatch():
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this._authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;

        if (isAuth) {
          return true;
        }

        this._toastrService.info('Please, login to continue.');

        return this._router.createUrlTree(['/login']);
      }),
    );
  }
}
