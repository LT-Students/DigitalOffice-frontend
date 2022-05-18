import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';
import { EmployeePageService } from './services/employee-page.service';
import { EmployeePageComponent } from './employee-page.component';
import { UserListComponent } from './components/user-list/user-list.component';

const employeeRoutes: Routes = [
	{
		path: '',
		component: UserListComponent,
		resolve: {
			users: UserResolver,
		},
	},
	{ path: ':id', component: EmployeePageComponent, resolve: { employee: EmployeePageService } },
	{ path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forChild(employeeRoutes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
