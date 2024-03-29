import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, from, Observable } from 'rxjs';
import { NewsService } from '@app/services/news/news.service';
import { catchError, concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IOutputBlockData } from '../models/output-data.interface';
import { ArticlePreview } from '../models/news.model';
import { EditorJSParser } from '../parser';

@Injectable({
	providedIn: 'root',
})
export class NewsFeedService implements Resolve<ArticlePreview[]> {
	private _newsFeed: BehaviorSubject<ArticlePreview[]>;
	public newsFeed$: Observable<ArticlePreview[]>;
	public _newsCount: number;
	public _totalCount: number;

	constructor(private _editorJSParser: EditorJSParser, private _newsService: NewsService) {
		this._newsFeed = new BehaviorSubject<ArticlePreview[]>([]);
		this.newsFeed$ = this._newsFeed.asObservable();
		this._newsCount = 0;
		this._totalCount = 1;
	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticlePreview[]> {
		return this.getArticlePreviews({
			skipCount: 0,
			takeCount: 10,
		});
	}

	public getArticlePreviews(params: { skipCount: number; takeCount: number }): Observable<ArticlePreview[]> {
		return this._newsService.findNews(params).pipe(
			tap((articlePreviews) => {
				this._totalCount = articlePreviews.totalCount ?? 0;
				this._newsCount += articlePreviews.body?.length ?? 0;
			}),
			switchMap((articlePreviews) => from(articlePreviews.body ?? [])),
			concatMap((articlePreview) => {
				try {
					const preview: IOutputBlockData[] = JSON.parse(articlePreview.preview as string);

					return this._editorJSParser.parse(preview).pipe(
						map((block) => ({ ...articlePreview, preview: block.join('') } as ArticlePreview)),
						catchError((err) => {
							return EMPTY;
						})
					);
				} catch (e) {
					return EMPTY;
				}
			}),
			toArray(),
			tap((articlePreviews) => {
				this._newsFeed.next([...articlePreviews]);
			})
		);
	}

	// public getArticlePreviews(refresh = false): Observable<ArticlePreview[]> {
	// 	if (refresh) {
	// 		this._newsCount = 0;
	// 		this._newsFeed.next([]);
	// 	}
	//
	// 	const params: IFindNewsRequest = {
	// 		skipCount: this._newsCount,
	// 		takeCount: 50,
	// 	};
	//
	// 	return this._newsService.findNews(params).pipe(
	// 		tap((articlePreviews) => {
	// 			this._totalCount = articlePreviews.totalCount ?? 0;
	// 			this._newsCount += articlePreviews.body?.length ?? 0;
	// 		}),
	// 		switchMap((articlePreviews) => from(articlePreviews.body ?? [])),
	// 		concatMap((articlePreview) => {
	// 			try {
	// 				const preview: IOutputBlockData[] = JSON.parse(articlePreview.preview as string);
	//
	// 				return this._editorJSParser.parse(preview).pipe(
	// 					map((block) => ({ ...articlePreview, preview: block.join('') } as ArticlePreview)),
	// 					catchError((err) => {
	// 						console.log(err);
	// 						return EMPTY;
	// 					})
	// 				);
	// 			} catch (e) {
	// 				return EMPTY;
	// 			}
	// 		}),
	// 		toArray(),
	// 		tap((articlePreviews) => {
	// 			const prevValue = this._newsFeed.value;
	// 			this._newsFeed.next([...prevValue, ...articlePreviews]);
	// 		})
	// 	);
	// }

	public deleteNews(newsId: string): Observable<OperationResultResponse<{}>> {
		return this._newsService.disableNews(newsId).pipe(
			tap((result) => {
				const splicedNews = this._newsFeed.value.filter((articlePreview) => articlePreview.id !== newsId);
				this._newsFeed.next(splicedNews);
			})
		);
	}

	public replaceEditedNews(newsId: string): Observable<ArticlePreview> {
		return this._newsService.getNews(newsId).pipe(
			map((response) => response.body),
			switchMap((article) =>
				this._editorJSParser
					.parse(JSON.parse(article?.preview ?? '[]'))
					.pipe(map((block) => ({ ...article, preview: block.join('') } as ArticlePreview)))
			),
			tap({
				next: (article) => {
					const newsCopy = this._newsFeed.value;
					const editIndex = newsCopy.findIndex((news) => news.id === newsId);
					newsCopy[editIndex] = article;
					this._newsFeed.next(newsCopy);
				},
			})
		);
	}
}
