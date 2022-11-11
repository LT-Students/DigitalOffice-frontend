import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import { SharedModule } from '@shared/shared.module';
import { TinymceEditorModule } from '../tinymce-editor/tinymce-editor.module';
import { WikiRoutingModule } from './wiki-routing.module';
import { ArticlePageComponent } from './article-page/article-page.component';
import { NavigationTreeComponent } from './article-page/navigation-tree/navigation-tree.component';
import { BackNavigationComponent } from './shared/back-navigation/back-navigation.component';
import { ArticleEditorComponent } from './shared/article-editor/article-editor.component';
import { ArticleActionsComponent } from './article-page/article-actions/article-actions.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { RouterContainerComponent } from './router-container.component';
import { ArticlePathComponent } from './new-article/article-path/article-path.component';

@NgModule({
	declarations: [
		ArticlePageComponent,
		NavigationTreeComponent,
		BackNavigationComponent,
		ArticleEditorComponent,
		ArticleActionsComponent,
		NewArticleComponent,
		RouterContainerComponent,
		ArticlePathComponent,
	],
	imports: [SharedModule, WikiRoutingModule, CdkTreeModule, TinymceEditorModule],
})
export class WikiModule {}
