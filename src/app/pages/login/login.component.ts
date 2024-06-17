import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';

import { AuthService } from '@auth/auth.service';
import { IUserCredentials } from "@interfaces/user-credentials.interface";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class LoginComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public isPasswordVisible = false;
  public signInForm = this._fb.nonNullable.group({
    email: [
      'nurlan@payme.uz',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: [
      '12345678',
      {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{8,}$/),
        ],
      },
    ],
  });

  public constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) {}

  ngOnDestroy() :void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onSubmit(): void {
    if (this.signInForm.invalid) {
      return;
    }

    if (this._isValidFormValue(this.signInForm.value)) {
      this._authService
        .login(this.signInForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this._router.navigate(['/todos']);
            this._toastrService.success('Successfully logged in');
          },
          error: (error: string) => {
            this._toastrService.error(error);
          },
        });
    }
  }

  private _isValidFormValue(
    data: Partial<IUserCredentials>,
  ): data is IUserCredentials {
    return 'email' in data && 'password' in data;
  }
}
