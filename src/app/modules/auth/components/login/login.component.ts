import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { IAuthenticationRequest, IAuthenticationResponse } from 'src/app/interfaces/auth/auth.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { IUserResponse } from "../../../../interfaces/user-response.interface";

@Component({
  selector: 'do-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private loginError: string;
  private isWaiting: boolean = false;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  private login(): void {
    this.isWaiting = true;

    const authenticationRequest: IAuthenticationRequest = this.loginForm.value;
    this.authService.login(authenticationRequest)
      .subscribe({
        next: (val: IAuthenticationResponse) => {
          this.userService.getUser(val.userId)
          .subscribe({
              next: (user: IUserResponse) => {
                this.localStorageService.set('user', user);
                if (user.isAdmin) {
                  this.router.navigate(['/admin/dashboard']);
                } else {
                  this.router.navigate(['/attendance']);
                }
              },
              error: error => {
                console.log('Getting user info failed.', error.message);
              }
            });
        },
        error: error => {
          this.loginError = error.message;
          this.isWaiting = false;
        },
        complete: () => {
          this.isWaiting = false;
        }
      });
  }

  private isEmailInputValid(): boolean {
    return !(this.loginForm.get('email').touched &&
    this.loginForm.get('email').invalid);
  }

  private isPasswordInputValid(): boolean {
    return !(this.loginForm.get('password').touched &&
    this.loginForm.get('password').invalid);
  }
}
