import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedService } from '@app/services/news-feed.service';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';

const newsRoutes: Routes = [{ path: '', component: NewsFeedComponent, resolve: { news: NewsFeedService } }];

@NgModule({
	imports: [RouterModule.forChild(newsRoutes)],
	exports: [RouterModule],
})
export class NewsRoutingModule {}
