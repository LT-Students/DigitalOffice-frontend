import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page/article-page.component';
import { WikiTreeResolver } from './resolver/wiki-tree.resolver';
import { ArticleResolver } from './resolver/article.resolver';

const wikiRoutes: Routes = [
	{
		// TODO Add article title to title of the page
		path: ':id',
		component: ArticlePageComponent,
		resolve: {
			wikiTree: WikiTreeResolver,
			article: ArticleResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(wikiRoutes)],
	exports: [RouterModule],
})
export class WikiRoutingModule {}
