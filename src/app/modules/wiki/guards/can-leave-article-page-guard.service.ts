import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlePageComponent } from '../article-page/article-page.component';

@Injectable({
	providedIn: 'root',
})
export class CanLeaveArticlePageGuard implements CanDeactivate<ArticlePageComponent> {
	canDeactivate(
		component: ArticlePageComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return component.closeEditMode();
	}
}
