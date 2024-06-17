import { exhaustMap, take } from 'rxjs';

import { HttpHandler, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '@auth/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: any, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Token ${user.token}`,
          },
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}
