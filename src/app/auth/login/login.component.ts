import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
    private userService: UserService,
    private formBuilder: FormBuilder) { 
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  private signin() : void {
    this.isWaiting = true;
    this.userService.signin();
    setTimeout(() => {
      this.isWaiting = false;
    }, 1000);
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
