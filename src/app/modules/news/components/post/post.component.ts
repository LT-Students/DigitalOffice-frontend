import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Article } from '@app/models/news.model';
import { NewsService } from '@app/services/news/news.service';
import { EditorJSParser } from '../../parser';
import { OperationResultStatusType } from '@data/api/news-service/models';

@Component({
	selector: 'do-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
	public article$: Observable<Article | undefined>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public postId: string,
		private _dialogRef: MatDialogRef<PostComponent>,
		private _editorJSParser: EditorJSParser,
		private _newsService: NewsService
	) {
		this.article$ = new Observable(undefined);
	}

	public ngOnInit(): void {
		this.article$ = this._newsService
			.getNews(this.postId)
			.pipe(
				map(article => article.body),
				mergeMap(article => {
					let blocks = JSON.parse(article?.content ?? '[]');
					let notHiddenBlocks = blocks.filter((block: any) => (block?.tunes && block.tunes?.previewTune) ? !block.tunes.previewTune.hidden : true);
					return this._editorJSParser.parse(notHiddenBlocks)
						.pipe(map(block => ({ ...article, content: block.join("") }) as Article));
				})
			)
	}

	public onNewsDelete(newsId: string | undefined): void {
		this._newsService.disableNews(newsId ?? '').subscribe(
			result => {
				if (result.status === OperationResultStatusType.FullSuccess) {
					this.closeModal({ newsId });
				}
			}
		)
	}

	public closeModal(dialogResult?: { newsId: string | undefined }): void {
		this._dialogRef.close(dialogResult);
	}
}
