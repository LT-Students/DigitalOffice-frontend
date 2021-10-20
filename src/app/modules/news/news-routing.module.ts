import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { NewsResolver } from './resolvers/news.resolver';

const newsRoutes: Routes = [{ path: '', component: NewsFeedComponent, resolve: { news: NewsResolver } }];

@NgModule({
	imports: [RouterModule.forChild(newsRoutes)],
	exports: [RouterModule],
})
export class NewsRoutingModule {}
