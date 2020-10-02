import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'do-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [ './forgot-password.component.scss' ]
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public forgotPasswordError: string;
  public isWaiting = false;
  public isCompleted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ]
    });
  }

  ngOnInit(): void {
  }

  public resetPassword() {
    this.isWaiting = true;
    setTimeout(() => {
      this.isCompleted = true;
      this.isWaiting = false;
    }, 1000);
  }

  public isEmailInputValid(): boolean {
    return !(this.forgotPasswordForm.get('email').touched &&
      this.forgotPasswordForm.get('email').invalid);
  }
}
