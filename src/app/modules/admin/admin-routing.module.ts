import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { PositionResolver } from './resolvers/position.resolver';
import { OfficeResolver } from './resolvers/office.resolver';
import { RoleResolver } from './resolvers/role.resolver';
import { AdminRoutes } from './models/admin-routes';

const adminRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: AdminRoutes.Dashboard },
	{ path: AdminRoutes.Dashboard, component: DashboardComponent },
	{
		path: AdminRoutes.Roles,
		component: ManageRolesComponent,
		resolve: {
			roles: RoleResolver,
		},
	},
	{
		path: AdminRoutes.Offices,
		component: OfficeListComponent,
		resolve: {
			offices: OfficeResolver,
		},
	},
	{
		path: AdminRoutes.Positions,
		component: PositionListComponent,
		resolve: {
			positions: PositionResolver,
		},
	},
	{ path: '**', redirectTo: AdminRoutes.Dashboard, pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(adminRoutes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
