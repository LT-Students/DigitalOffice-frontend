import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListResolver } from './resolvers/user-list-resolver.service';
import { EmployeePageComponent } from './employee-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { PersonalProjectsResolver } from './resolvers/personal-projects.resolver';

const employeeRoutes: Routes = [
	{
		path: '',
		component: UserListComponent,
		resolve: {
			users: UserListResolver,
		},
	},
	{
		path: ':id',
		component: EmployeePageComponent,
		resolve: { employee: EmployeeResolver, projects: PersonalProjectsResolver },
	},
	{ path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forChild(employeeRoutes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
