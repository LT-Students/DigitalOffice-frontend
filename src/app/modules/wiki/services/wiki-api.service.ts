import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponse, RubricData } from '@api/wiki-service/models';
import { ArticleApiService, WikiTreeApiService } from '@api/wiki-service/services';
import { ArticlePath, PatchDocument } from '@app/types/edit-request';

@Injectable({
	providedIn: 'root',
})
export class WikiApiService {
	constructor(private wikiTreeApi: WikiTreeApiService, private articleApi: ArticleApiService) {}

	public getWikiTree(): Observable<RubricData[]> {
		return this.wikiTreeApi.getWiki();
	}

	public getArticle(articleId: string): Observable<ArticleResponse> {
		return this.articleApi.getArticle({ articleId });
	}

	public createArticle(rubricId: string, name: string, content: string): Observable<string> {
		return this.articleApi.createArticle({ body: { rubricId, name, content } });
	}

	public editArticle(articleId: string, editRequest: PatchDocument<ArticlePath>[]): Observable<boolean> {
		return this.articleApi.editArticle({ articleId, body: editRequest });
	}
}
