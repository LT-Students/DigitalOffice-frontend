import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const authRoutes: Routes = [
    { 
        path: 'auth',
        component: AuthComponent, 
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'forgotpassword', component: ForgotPasswordComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule { }