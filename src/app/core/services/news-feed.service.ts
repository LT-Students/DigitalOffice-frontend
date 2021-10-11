import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, from, Observable } from 'rxjs';
import { ArticlePreview } from '@app/models/news.model';
import { IFindNewsRequest, NewsService } from '@app/services/news/news.service';
import { catchError, concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';
import { IOutputBlockData } from '@app/models/editorjs/output-data.interface';
import { EditorJSParser } from '../../modules/news/parser';

@Injectable({
	providedIn: 'root',
})
export class NewsFeedService {
	private _newsFeed: BehaviorSubject<ArticlePreview[]>;
	public newsFeed$: Observable<ArticlePreview[]>;
	private _newsCount: number;
	private _totalCount: number;

	constructor(private _editorJSParser: EditorJSParser, private _newsService: NewsService) {
		this._newsFeed = new BehaviorSubject<ArticlePreview[]>([]);
		this.newsFeed$ = this._newsFeed.asObservable();
		this._newsCount = 0;
		this._totalCount = 1;
	}

	public getArticlePreviews(refresh = false): void {
		if (refresh) {
			this._newsCount = 0;
			this._newsFeed.next([]);
		}

		const params: IFindNewsRequest = {
			skipCount: this._newsCount,
			takeCount: 10,
		};

		this._newsService
			.findNews(params)
			.pipe(
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
								console.log(err);
								return EMPTY;
							})
						);
					} catch (e) {
						return EMPTY;
					}
				}),
				toArray(),
				tap((articlePreviews) => {
					const prevValue = this._newsFeed.value;
					this._newsFeed.next([...prevValue, ...articlePreviews]);
				})
			)
			.subscribe();
	}

	public deleteNews(newsId: string) {
		return this._newsService.disableNews(newsId).pipe(
			tap((result) => {
				if (result.status === 'FullSuccess') {
					const splicedNews = this._newsFeed.value.filter((articlePreview) => articlePreview.id !== newsId);
					this._newsFeed.next(splicedNews);
				}
			})
		);
	}

	public editNews(newsId: string) {
		this._newsService
			.getNews(newsId)
			.pipe(
				map((response) => response.body),
				switchMap((article) =>
					this._editorJSParser
						.parse(JSON.parse(article?.preview ?? '[]'))
						.pipe(map((block) => ({ ...article, preview: block.join('') } as ArticlePreview)))
				)
			)
			.subscribe({
				next: (article) => {
					const newsCopy = this._newsFeed.value;
					const editIndex = newsCopy.findIndex((news) => news.id === newsId);
					newsCopy[editIndex] = article;
					this._newsFeed.next(newsCopy);
				},
			});
	}
}
