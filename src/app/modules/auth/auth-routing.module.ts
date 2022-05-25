import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupGuard } from './guards/signup.guard';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './components/auth/auth.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthRoutes } from './models/auth-routes';
import { ReactivateComponent } from './components/reactivate/reactivate.component';

const authRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: AuthRoutes.SignIn,
			},
			{ path: AuthRoutes.SignIn, component: LoginComponent },
			{ path: AuthRoutes.ForgotPassword, component: ForgotPasswordComponent },
			{ path: AuthRoutes.ResetPassword, component: ResetPasswordComponent },
			{ path: AuthRoutes.SignUp, component: SignupComponent, canActivate: [SignupGuard] },
			{ path: AuthRoutes.Reactivate, component: ReactivateComponent, canActivate: [SignupGuard] },
		],
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule],
	providers: [],
})
export class AuthRoutingModule {}
