import { Component, ChangeDetectionStrategy, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Article } from '@app/models/news.model';
import { NewsService } from '@app/services/news/news.service';
import { OperationResultStatusType } from '@data/api/news-service/models';
import { ModalService } from '@app/services/modal.service';
import { NewsFeedService } from '@app/services/news-feed.service';
import { IOutputBlockData } from '@app/models/editorjs/output-data.interface';
import { CompanyService } from '@app/services/company/company.service';
import { EditorJSParser } from '../../parser';
import { NewsEditorComponent } from '../news-editor/news-editor.component';
import { ConfirmDialogData } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'do-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
	public article$: Observable<Article | undefined>;
	public companyName: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public postId: string,
		private _dialogRef: MatDialogRef<PostComponent>,
		private _editorJSParser: EditorJSParser,
		private _newsService: NewsService,
		private _newsFeedService: NewsFeedService,
		private _modalService: ModalService,
		private _cdr: ChangeDetectorRef,
		private _companyService: CompanyService
	) {
		this.article$ = this._getNews();
		this.companyName = this._companyService.getCompanyName();
	}

	private _getNews(): Observable<Article | undefined> {
		return this._newsService.getNews(this.postId).pipe(
			map((article) => article.body),
			mergeMap((article) => {
				let blocks = JSON.parse(article?.content ?? '[]');
				let notHiddenBlocks = blocks.filter((block: any) =>
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
			.fullScreen(NewsEditorComponent, this.postId)
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
				if (result.status === OperationResultStatusType.FullSuccess) {
					this.closeModal(newsId);
				}
			});
	}

	public closeModal(newsId?: string): void {
		this._dialogRef.close(newsId);
	}
}
