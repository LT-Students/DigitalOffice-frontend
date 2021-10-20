import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsFeedService } from '@app/services/news-feed.service';
import { ArticlePreview } from '@app/models/news.model';

@Injectable({
	providedIn: 'root',
})
export class NewsResolver implements Resolve<ArticlePreview[]> {
	constructor(private _newsFeedService: NewsFeedService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticlePreview[]> {
		return this._newsFeedService.getArticlePreviews();
	}
}
