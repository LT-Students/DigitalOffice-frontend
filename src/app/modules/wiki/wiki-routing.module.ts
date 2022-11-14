import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleResolver, WikiTreeResolver } from './resolvers';
import { NewArticleComponent } from './new-article/new-article.component';
import { WikiRoutes } from './models';
import { RouterContainerComponent } from './router-container.component';
import { CanLeaveArticlePageGuard } from './guards/can-leave-article-page-guard.service';

const wikiRoutes: Routes = [
	{
		path: '',
		component: RouterContainerComponent,
		resolve: {
			wikiTree: WikiTreeResolver,
		},
		children: [
			{
				path: WikiRoutes.NewArticle,
				component: NewArticleComponent,
				title: 'Новая статья',
			},
			{
				path: ':id',
				component: ArticlePageComponent,
				canDeactivate: [CanLeaveArticlePageGuard],
				resolve: {
					article: ArticleResolver,
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(wikiRoutes)],
	exports: [RouterModule],
})
export class WikiRoutingModule {}
