import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WikiMainComponent } from './main/wiki-main.component';
import { WikiHeadingsResolver } from './resolvers/wiki-headings-resolver.service';

const wikiRoutes: Routes = [
	{
		path: '',
		component: WikiMainComponent,
		resolve: {
			rubrics: WikiHeadingsResolver,
		},
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(wikiRoutes)],
	exports: [RouterModule],
})
export class WikiRoutingModule {}
