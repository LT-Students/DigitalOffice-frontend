import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeePageService } from '@app/services/employee-page.service';
import { EmployeePageComponent } from './employee-page.component';

const employeeRoutes: Routes = [
	{ path: '', component: EmployeePageComponent, resolve: { employee: EmployeePageService } },
];

@NgModule({
	imports: [RouterModule.forChild(employeeRoutes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
