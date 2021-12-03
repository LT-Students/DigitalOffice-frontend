import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
	declarations: [AuthComponent, LoginComponent, ForgotPasswordComponent, SignupComponent, ResetPasswordComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
