import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'do-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  isWaiting: boolean = false;


  constructor( 
    private userService: UserService,
    private formBuilder: FormBuilder) { 
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  signin(){
    this.isWaiting = true;
    this.userService.signin();
    setTimeout(() => {
      this.isWaiting = false;
    }, 1000);
  }

  isEmailInputValid(): boolean{
    return !(this.loginForm.get('email').touched &&
    this.loginForm.get('email').invalid);
  }

  isPasswordInputValid(): boolean{
    return !(this.loginForm.get('password').touched && 
    this.loginForm.get('password').invalid);
  }
}
