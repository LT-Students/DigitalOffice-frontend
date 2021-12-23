import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { NewsService } from '@app/services/news/news.service';
import { ArticlePreview } from '@app/models/news.model';
import { ModalService } from '@app/services/modal.service';
import { NewsFeedService } from '@app/services/news-feed.service';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { PageEvent } from '@angular/material/paginator';
import { EditorJSParser } from '../../parser';
import { PostComponent } from '../post/post.component';
import { NewsEditorComponent } from '../news-editor/news-editor.component';
import { ConfirmDialogData } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'do-news-feed',
	templateUrl: './news-feed.component.html',
	styleUrls: ['./news-feed.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedComponent {
	public newsFeed$: Observable<ArticlePreview[]>;

	public fixedTags: boolean;

	public companyName: Observable<string>;

	public pageIndex: number;
	public pageSize: number;
	public totalCount: number;

	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _modalService: ModalService,
		private _newsService: NewsService,
		private _currentCompanyService: CurrentCompanyService,
		private _cdr: ChangeDetectorRef,
		private _editorJSParser: EditorJSParser,
		private _newsFeedService: NewsFeedService
	) {
		this.totalCount = this._newsFeedService._totalCount;
		this.pageIndex = 0;
		this.pageSize = 10;
		this.fixedTags = false;
		this.newsFeed$ = this._newsFeedService.newsFeed$;
		this.companyName = this._currentCompanyService.company$.pipe(map((company) => company.companyName));
		this.getData({ takeCount: 10, skipCount: 0 });
	}

	@HostListener('window: scroll', [])
	public onWindowScroll(): void {
		this.fixedTags = this._document.documentElement.scrollTop >= 100;
	}

	// public getData(refresh = false): void {
	// 	console.log('И?')
	// 	this._newsFeedService.getArticlePreviews(refresh).pipe(tap(() => {
	// 		this.totalCount = this._newsFeedService._totalCount;
	// 		this.pageIndex = this._newsFeedService._newsCount
	// 	}))
	// 	.subscribe();
	// }

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;

		this.getData({
			skipCount: this.pageIndex * this.pageSize,
			takeCount: this.pageSize,
		});
	}

	public getData(params: { skipCount: number; takeCount: number }): void {
		this._newsFeedService
			.getArticlePreviews(params)
			.pipe(
				tap(() => {
					this.totalCount = this._newsFeedService._totalCount;
				})
			)
			.subscribe();
	}

	public onMenuOpen(event: MouseEvent): void {
		event.stopPropagation();
	}

	public onNewsDelete(newsId: string | undefined): void {
		const confirmDialogData: ConfirmDialogData = {
			title: 'Удаление новости',
			message: 'Вы действительно хотите удалить новость? Отменить данное действие будет невозможно.',
			confirmText: 'Да, удалить',
		};
		this._modalService
			.confirm(confirmDialogData)
			.afterClosed()
			.pipe(
				switchMap((isDeleted) => {
					if (isDeleted) {
						return this._newsFeedService.deleteNews(newsId ?? '');
					}
					return EMPTY;
				})
			)
			.subscribe();
	}

	public openPost(postId: string | undefined): void {
		this._modalService
			.fullScreen(PostComponent, postId)
			.afterClosed()
			.subscribe((result) => {
				console.log(result);
				this.getData({
					takeCount: this.pageSize,
					skipCount: this.pageIndex * this.pageSize,
				});
			});
	}

	public openEditor(newsId?: string): void {
		this._modalService
			.fullScreen(NewsEditorComponent, { _newsId: newsId })
			.afterClosed()
			.subscribe({
				next: (isNewsFeedUpdated) => {
					if (isNewsFeedUpdated) {
						if (newsId) {
							this._newsFeedService.replaceEditedNews(newsId).subscribe();
						} else {
							this.getData({
								takeCount: this.pageSize,
								skipCount: this.pageIndex * this.pageSize,
							});
						}
					}
				},
			});
	}
}
