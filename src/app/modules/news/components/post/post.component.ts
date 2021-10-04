import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { Article } from '@app/models/news.model';
import { NewsService } from '@app/services/news/news.service';
import { EditorJSParser } from '../../parser';
import { OperationResultStatusType } from '@data/api/news-service/models';
import { IOutputBlockData } from '@app/models/editorjs/output-data.interface';
import { CompanyService } from '@app/services/company/company.service';

@Component({
	selector: 'do-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
	public article$: Observable<Article | undefined>;
	public companyName: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public postId: string,
		private _dialogRef: MatDialogRef<PostComponent>,
		private _editorJSParser: EditorJSParser,
		private _newsService: NewsService,
		private _companyService: CompanyService
	) {
		this.article$ = new Observable();
		this.companyName = this._companyService.getCompanyName();
	}

	public ngOnInit(): void {
		this.article$ = this._newsService
			.getNews(this.postId)
			.pipe(
				map(article => article.body),
				mergeMap(article => {
					const blocks = JSON.parse(article?.content ?? '[]') as IOutputBlockData[];
					const notHiddenBlocks = blocks.filter((block) => (block?.tunes && block.tunes?.previewTune) ? !block.tunes.previewTune.hidden : true);
					return this._editorJSParser.parse(notHiddenBlocks)
						.pipe(map(block => ({ ...article, content: block.join("") }) as Article));
				})
			)
	}

	public onNewsDelete(): void {
		this._newsService.disableNews(this.postId).subscribe(
			result => {
				if (result.status === OperationResultStatusType.FullSuccess) {
					this.closeModal(this.postId);
				}
			}
		)
	}

	public closeModal(postId?: string): void {
		this._dialogRef.close(postId);
	}
}
