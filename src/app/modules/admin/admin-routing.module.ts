import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteType } from '../../app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { DirectorsTimelistComponent } from './components/directors-timelist/directors-timelist.component';
import { PositionResolver } from './resolvers/position.resolver';
import { OfficeResolver } from './resolvers/office.resolver';
import { RoleResolver } from './resolvers/role.resolver';
import { TimelistResolver } from './resolvers/timelist.resolver';

const adminRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
	{ path: 'dashboard', component: DashboardComponent },
	{
		path: 'manage-roles',
		component: ManageRolesComponent,
		resolve: {
			roles: RoleResolver,
		},
	},
	{
		path: 'offices',
		component: OfficeListComponent,
		resolve: {
			offices: OfficeResolver,
		},
	},
	{
		path: 'positions',
		component: PositionListComponent,
		resolve: {
			positions: PositionResolver,
		},
	},
	{
		path: `${RouteType.DEPARTMENTS}/:id/timelist`,
		component: DirectorsTimelistComponent,
		resolve: {
			timelist: TimelistResolver,
		},
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(adminRoutes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
