import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { PostComponent } from './components/post/post.component';
import { NewsEditorComponent } from './components/news-editor/news-editor.component';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
	declarations: [
		NewsEditorComponent,
		NewsFeedComponent,
		PostComponent
	],
	imports: [SharedModule, NewsRoutingModule],
})
export class NewsModule {}
