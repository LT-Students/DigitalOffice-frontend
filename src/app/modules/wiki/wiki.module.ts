import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { SharedModule } from '@shared/shared.module';
import { TinymceEditorModule } from '../tinymce-editor/tinymce-editor.module';
import { WikiRoutingModule } from './wiki-routing.module';
import { ArticlePageComponent } from './article-page/article-page.component';
import { NavigationTreeComponent } from './article-page/navigation-tree/navigation-tree.component';
import { BackNavigationComponent } from './shared/back-navigation/back-navigation.component';
import { ArticleEditorComponent } from './shared/article-editor/article-editor.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { RouterContainerComponent } from './router-container.component';
import { ArticleViewerComponent } from './article-page/article-viewer/article-viewer.component';
import { TreeBreadcrumbsComponent } from './article-page/tree-breadcrumbs/tree-breadcrumbs.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CreateWikiNodeFormComponent } from './shared/create-wiki-node-form/create-wiki-node-form.component';
import { CreateWikiNodeDialogComponent } from './edit-page/create-wiki-node-dialog/create-wiki-node-dialog.component';
import { EditableTreeComponent } from './edit-page/editable-tree/editable-tree.component';

@NgModule({
	declarations: [
		ArticlePageComponent,
		NavigationTreeComponent,
		BackNavigationComponent,
		ArticleEditorComponent,
		NewArticleComponent,
		RouterContainerComponent,
		ArticleViewerComponent,
		TreeBreadcrumbsComponent,
		EditPageComponent,
		CreateWikiNodeFormComponent,
		CreateWikiNodeDialogComponent,
		EditableTreeComponent,
	],
	imports: [SharedModule, WikiRoutingModule, CdkTreeModule, TinymceEditorModule, DragDropModule],
})
export class WikiModule {}
