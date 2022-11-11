import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RubricData } from '@api/wiki-service/models';
import { ArticleApiService, WikiTreeApiService } from '@api/wiki-service/services';

@Injectable({
	providedIn: 'root',
})
export class WikiApiService {
	constructor(private wikiTreeApi: WikiTreeApiService, private articleApi: ArticleApiService) {}

	public getWikiTree(): Observable<RubricData[]> {
		return this.wikiTreeApi.getWiki();
	}

	public createArticle(rubricId: string, name: string, content: string): Observable<string> {
		return this.articleApi.createArticle({ body: { rubricId, name, content } });
	}
}
