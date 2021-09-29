import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
	declarations: [
		NewsFeedComponent,
		PostComponent
	],
	imports: [SharedModule],
})
export class NewsModule { }
