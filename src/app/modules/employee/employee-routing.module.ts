import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { GenderApiService } from '@api/user-service/services';
import { UserListResolver } from './resolvers/user-list-resolver.service';
import { EmployeePageComponent } from './employee-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { PersonalProjectsResolver } from './resolvers/personal-projects.resolver';

const employeeRoutes: Routes = [
	{
		path: '',
		component: UserListComponent,
		title: 'Список сотрудников',
		resolve: {
			users: UserListResolver,
		},
	},
	{
		path: ':id',
		component: EmployeePageComponent,
		title: 'Карточка сотрудника',
		resolve: {
			employee: EmployeeResolver,
			projects: PersonalProjectsResolver,
			genders: () => {
				const genderApi = inject(GenderApiService);
				return genderApi.findGender({ skipCount: 0, takeCount: 2 }).pipe(map((res) => res.body));
			},
		},
	},
	{ path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forChild(employeeRoutes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
