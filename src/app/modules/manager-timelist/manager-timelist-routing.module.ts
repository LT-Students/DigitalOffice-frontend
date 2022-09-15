import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerTimelistComponent } from './manager-timelist.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ManagerTimelistComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ManagerTimelistRoutingModule {}
