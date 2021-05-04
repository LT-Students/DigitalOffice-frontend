
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'firstlogin', component: SignupComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full'  }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
