import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { NewsService } from '@app/services/news/news.service';
import { OperationResultStatusType } from '@api/news-service/models';
import { DialogService } from '@app/services/dialog.service';
import { ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Icons } from '@shared/modules/icons/icons';
import { Article } from '../../models/news.model';
import { NewsFeedService } from '../../services/news-feed.service';
import { EditorJSParser } from '../../parser';
import { NewsEditorComponent } from '../news-editor/news-editor.component';

@Component({
	selector: 'do-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
	public readonly Icons = Icons;
	public article$: Observable<Article | undefined>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public postId: string,
		private _dialogRef: MatDialogRef<PostComponent>,
		private _editorJSParser: EditorJSParser,
		private _newsService: NewsService,
		private _newsFeedService: NewsFeedService,
		private _modalService: DialogService,
		private _cdr: ChangeDetectorRef
	) {
		this.article$ = this._getNews();
	}

	private _getNews(): Observable<Article | undefined> {
		return this._newsService.getNews(this.postId).pipe(
			map((article) => article.body),
			mergeMap((article) => {
				const blocks = JSON.parse(article?.content ?? '[]');
				const notHiddenBlocks = blocks.filter((block: any) =>
					block?.tunes && block.tunes?.previewTune ? !block.tunes.previewTune.hidden : true
				);
				return this._editorJSParser
					.parse(notHiddenBlocks)
					.pipe(map((block) => ({ ...article, content: block.join('') } as Article)));
			})
		);
	}

	public openEditor(): void {
		this._modalService
			.fullScreen(NewsEditorComponent, { _newsId: this.postId, openedFromPost: true })
			.afterClosed()
			.subscribe({
				next: (isNewsEdited) => {
					if (isNewsEdited) {
						this.article$ = this._getNews();
						this._cdr.markForCheck();
					}
				},
			});
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
			.subscribe((result) => {
				this.closeModal(newsId);
			});
	}

	public closeModal(newsId?: string): void {
		this._dialogRef.close(newsId);
	}
}
