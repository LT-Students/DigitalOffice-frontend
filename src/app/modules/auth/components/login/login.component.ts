import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserResponse } from '../../../../../../libs/api/src/lib/user-service';

import { UserService } from '../../../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationRequest, AuthenticationResponse } from '../../../../../../libs/api/src/lib/auth-service';

@Component({
  selector: 'do-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  isWaiting = false;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.isWaiting = true;

    const authenticationRequest: AuthenticationRequest = this.loginForm.value;
    this.authService.login(authenticationRequest).pipe(
      switchMap((val: AuthenticationResponse) => {
          this.isWaiting = false;
          return this.userService.getUser(val.id);
        }
      ),
      catchError(error => {
        this.loginError = error.message;
        this.isWaiting = false;
        throw error;
      })
    )
      .subscribe(
        (user: UserResponse) => {
          if (user.isAdmin) {
            this.router.navigate(['/user/admin/dashboard']);
          } else {
            this.router.navigate(['/user/attendance']);
          }
        }, error => {
          console.log('Getting user info failed.', error.message);
        }
      );
  }

  isEmailInputValid(): boolean {
    return !this.loginForm.get('email').touched ||
      !this.loginForm.get('email').invalid;
  }

  isPasswordInputValid(): boolean {
    return !this.loginForm.get('password').touched ||
      !this.loginForm.get('password').invalid;
  }

  isDisable(): boolean {
    return (!this.loginForm.get('email').touched || this.loginForm.get('password').invalid) ||
      (!this.loginForm.get('password').touched || this.loginForm.get('password').invalid);
  }
}
