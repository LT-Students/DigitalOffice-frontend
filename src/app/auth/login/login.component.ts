import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IAuthenticationRequest } from 'src/app/models/auth/authentication-request.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

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
    private authenticationUser: AuthenticationService,
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

  private login() : void {
    this.isWaiting = true;

    const authenticationRequest: IAuthenticationRequest = this.loginForm.value;
    this.authenticationUser.login(authenticationRequest)
      .subscribe({
        next: val =>{
          this.userService.getUser(val.id).
            subscribe({
              next: user =>{
                this.localStorageService.set('user', user);
                if(user.isAdmin){
                  this.router.navigate(['/admin/dashboard']);
                }else{
                  this.router.navigate(['user/attendance']);
                }
              },
              error: error =>{
                console.log('Getting user info failed.', error.message);
              }
            });
        },
        error: error =>{
          this.loginError = error.message;
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
