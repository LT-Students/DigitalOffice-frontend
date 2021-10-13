import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NewsService } from '@app/services/news/news.service';
import { ArticlePreview } from '@app/models/news.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '@app/services/modal.service';
import { NewsFeedService } from '@app/services/news-feed.service';
import { CompanyService } from '@app/services/company/company.service';
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
export class NewsFeedComponent implements OnInit {
	public newsFeed$: Observable<ArticlePreview[]>;

	public fixedTags: boolean;

	public companyName: string;

	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _modalService: ModalService,
		private _newsService: NewsService,
		private _companyService: CompanyService,
		private _cdr: ChangeDetectorRef,
		private _editorJSParser: EditorJSParser,
		private _snackBar: MatSnackBar,
		private _newsFeedService: NewsFeedService
	) {
		this.fixedTags = false;
		this.newsFeed$ = this._newsFeedService.newsFeed$;
		this.companyName = this._companyService.getCompanyName();
	}

	@HostListener('window: scroll', [])
	public onWindowScroll(): void {
		this.fixedTags = this._document.documentElement.scrollTop >= 100;
	}

	public ngOnInit(): void {
		this.getData();
	}

	public getData(refresh = false): void {
		this._newsFeedService.getArticlePreviews(refresh);
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
		this._modalService.fullScreen(PostComponent, postId).afterClosed().subscribe();
	}

	public openEditor(newsId?: string): void {
		this._modalService
			.fullScreen(NewsEditorComponent, newsId)
			.afterClosed()
			.subscribe({
				next: (isNewsFeedUpdated) => {
					if (isNewsFeedUpdated) {
						if (newsId) {
							this._newsFeedService.editNews(newsId);
						} else {
							this.getData(true);
						}
					}
				},
			});
	}
}
