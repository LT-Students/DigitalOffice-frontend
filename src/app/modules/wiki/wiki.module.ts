import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import { SharedModule } from '@shared/shared.module';
import { WikiRoutingModule } from './wiki-routing.module';
import { ArticlePageComponent } from './article-page/article-page.component';
import { NavigationTreeComponent } from './article-page/navigation-tree/navigation-tree.component';
import { BackNavigationComponent } from './article-page/back-navigation/back-navigation.component';

@NgModule({
	declarations: [ArticlePageComponent, NavigationTreeComponent, BackNavigationComponent],
	imports: [SharedModule, WikiRoutingModule, CdkTreeModule],
})
export class WikiModule {}
