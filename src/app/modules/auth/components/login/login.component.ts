import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import { UserService } from '@app/services/user.service';
import { AuthenticationRequest } from '@data/api/auth-service/models/authentication-request';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { UserResponse as User } from '@data/api/user-service/models/user-response';

@Component({
  selector: 'do-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  isWaiting = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.isWaiting = true;

    const authenticationRequest: AuthenticationRequest = {
      loginData: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };

    this.authService
      .login(authenticationRequest)
      .pipe(
        switchMap((val: AuthenticationResponse) => {
          this.isWaiting = false;
          return this.userService.getUser(val.userId);
        }),
        catchError((error) => {
          this.loginError = error.message;
          this.isWaiting = false;
          throw error;
        })
      )
      .subscribe(
        (userInfo: User) => {
          if (userInfo.user.isAdmin) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/user/attendance']);
          }
        },
        (error) => {
          console.log('Getting user info failed.', error.message);
        }
      );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
