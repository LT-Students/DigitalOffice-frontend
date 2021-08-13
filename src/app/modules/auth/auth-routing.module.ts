//@ts-nocheck
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteType } from '../../app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from '@app/guards/auth.guard';

const authRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'login',
			},
			{ path: 'login', component: LoginComponent, canActivate: [AuthGuard], },
			{ path: 'forgotpassword', component: ForgotPasswordComponent },
			{ path: 'firstlogin', component: SignupComponent },
		]
	},
	{ path: '**', redirectTo: RouteType.AUTH, pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule],
	providers: [],
})
export class AuthRoutingModule {}
