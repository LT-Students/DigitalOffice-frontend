import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArticleResponse } from '@api/wiki-service/models';
import { WikiApiService, WikiStateService } from '../services';

@Injectable({
	providedIn: 'root',
})
export class ArticleResolver implements Resolve<ArticleResponse> {
	constructor(private wikiApi: WikiApiService, private title: Title, private wikiState: WikiStateService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleResponse> {
		const articleId = route.params['id'];
		return this.wikiApi.getArticle(articleId).pipe(
			tap((article: ArticleResponse) => {
				this.title.setTitle(article.name);
				this.wikiState.setActiveArticle(article);
			})
		);
	}
}