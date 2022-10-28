import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const wikiRoutes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild(wikiRoutes)],
	exports: [RouterModule],
})
export class WikiRoutingModule {}
