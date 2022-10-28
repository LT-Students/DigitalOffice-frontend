import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page/article-page.component';

const wikiRoutes: Routes = [
	{
		// TODO Add article title to title of the page
		path: ':id',
		component: ArticlePageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(wikiRoutes)],
	exports: [RouterModule],
})
export class WikiRoutingModule {}
