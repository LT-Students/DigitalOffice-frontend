import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';

import { PostComponent } from '../post/post.component';
import { EditorJSParser } from '../../parser';
import { IFindNewsRequest, NewsService } from '@app/services/news/news.service';
import { ArticlePreview } from '@app/models/news.model';
import { EditNewsRequest } from '@data/api/news-service/models';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
	selector: 'do-news-feed',
	templateUrl: './news-feed.component.html',
	styleUrls: ['./news-feed.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFeedComponent implements OnInit {
	public articlePreviews: ArticlePreview[];

	public fixedTags: boolean;
	private _newsCount: number;
	private _totalCount: number;

	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _matDialog: MatDialog,
		private _newsService: NewsService,
		private _cdr: ChangeDetectorRef,
		private _editorJSParser: EditorJSParser,
		private _snackBar: MatSnackBar
	) {
		this.fixedTags = false;
		this._newsCount = 0;
		this._totalCount = 0;
		this.articlePreviews = [];
	}

	@HostListener("window: scroll", [])
	public onWindowScroll(): void {
		if (this._document.documentElement.scrollTop >= 100) {
			this.fixedTags = true;
		} else {
			this.fixedTags = false;
		}
	}

	public ngOnInit(): void {
		this._getArticlePreviews();
	}

	public getData(): void {
		if (this._newsCount < this._totalCount) {
			this._getArticlePreviews();
		}
	}

	private _getArticlePreviews(): void {
		let params: IFindNewsRequest = {
			skipCount: this._newsCount,
			takeCount: 10
		};

		this._newsService
			.findNews(params)
			.pipe(
				tap(articlePreviews => {
					this._totalCount = articlePreviews.totalCount ?? 0;
					this._newsCount += articlePreviews.body?.length ?? 0;
					return articlePreviews
				}),
				switchMap(articlePreviews => from(articlePreviews.body ?? [])),
				concatMap(articlePreview => {
					return this._editorJSParser
						.parse(JSON.parse(articlePreview.preview ?? '[]'))
						.pipe(
							map(block => ({ ...articlePreview, preview: block.join("") }) as ArticlePreview)
						)
				}
				),
				toArray(),
			).subscribe(articlePreviews => {
				this.articlePreviews = [...this.articlePreviews, ...articlePreviews];
				this._cdr.markForCheck();
			});
	}

	public onMenuOpen(event: any): void {
		event.stopPropagation();
	}

	public onNewsDelete(newsId: string | undefined): void {
		this._newsService.disableNews(newsId).subscribe(
			result => {
				if (result.status === 'FullSuccess') {
					this.articlePreviews = this.articlePreviews.filter(articlePreview => articlePreview.id !== newsId);
				}
			}
		)
	}

	public openPost(postId: string | undefined): void {
		this._matDialog
			.open(PostComponent,
				{
					maxHeight: `100vh`,
					maxWidth: '100vw',
					height: `100%`,
					width: '100%',
					data: postId,
					autoFocus: false,
					panelClass: 'dialog-border-radius-none'
				})
			.afterClosed()
			.subscribe(response => {
				if (response) {
					this.articlePreviews = this.articlePreviews.filter(articlePreview => articlePreview.id !== response.newsId);
				}
			})
	}
}
