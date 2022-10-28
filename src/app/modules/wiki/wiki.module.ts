import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WikiRoutingModule } from './wiki-routing.module';
import { ArticlePageComponent } from './article-page/article-page.component';
import { NavigationTreeComponent } from './article-page/navigation-tree/navigation-tree.component';

@NgModule({
	declarations: [ArticlePageComponent, NavigationTreeComponent],
	imports: [SharedModule, WikiRoutingModule],
})
export class WikiModule {}
