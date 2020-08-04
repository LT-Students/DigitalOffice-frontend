import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'do-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  isWaiting: boolean = false;
  forgotPassword = false;


  constructor( 
    private userService: UserService,
    private formBuilder: FormBuilder) { 
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  signin(){
    this.isWaiting = true;
    this.userService.signin();
  }

  isUsernameInputValid(): boolean{
    return !(this.loginForm.get('username').touched &&
    this.loginForm.get('username').invalid);
  }

  isPasswordInputValid(): boolean{
    return !(this.loginForm.get('password').touched && 
    this.loginForm.get('password').invalid);
  }
}
