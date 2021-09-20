import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NewsEditorComponent } from './components/news-editor/news-editor.component';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
	declarations: [NewsEditorComponent],
	imports: [SharedModule, NewsRoutingModule],
})
export class NewsModule {}
