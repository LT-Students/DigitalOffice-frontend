import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import EditorJS, { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { debounceTime, skip, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, ReplaySubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { NewsService } from '@app/services/news/news.service';
import { CreateNewsRequest } from '@data/api/news-service/models/create-news-request';
import { UserService } from '@app/services/user/user.service';
import { DoValidators } from '@app/validators/do-validators';
import { NewsEditorConfig } from './news-editor.config';

@Component({
	selector: 'do-news-editor',
	templateUrl: './news-editor.component.html',
	styleUrls: ['./news-editor.component.scss', '../../editorjs-plugins/block-tunes/preview/index.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class NewsEditorComponent implements OnInit, OnDestroy {
	public articleHeading: FormControl;

	public editorData: BehaviorSubject<OutputBlockData[]>;
	private _editor: EditorJS;
	private _editorObserver?: MutationObserver;
	private _destroy$: ReplaySubject<void>;

	constructor(
		private _userService: UserService,
		private _newsService: NewsService,
		private _editorConfig: NewsEditorConfig,
		private _elementRef: ElementRef
	) {
		this.editorData = new BehaviorSubject<OutputBlockData[]>([]);
		const initialData: OutputData = JSON.parse(sessionStorage.getItem('news_draft') ?? '');
		this._editor = new EditorJS(this._editorConfig.createConfig(initialData));
		this._destroy$ = new ReplaySubject<void>(1);
		this.articleHeading = new FormControl('', [Validators.required, DoValidators.noWhitespaces]);
	}

	public ngOnInit(): void {
		this._detectEditorChanges()
			.pipe(
				debounceTime(200),
				skip(1),
				takeUntil(this._destroy$),
				switchMap(() => from(this._editor.save())),
				tap((outputData) => {
					this.editorData.next(outputData.blocks);
					sessionStorage.setItem('news_draft', JSON.stringify(outputData));
					console.log(this.editorData, this.editorData.value.length, outputData.blocks);
				})
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this._editorObserver?.disconnect();
		this._destroy$.next();
		this._destroy$.complete();
	}

	public onEnterPressed(event: Event) {
		event.preventDefault();
		const firstInputBlock = this._elementRef.nativeElement.querySelector('.ce-paragraph');
		firstInputBlock.focus();
	}

	public saveEditorData(): void {
		let userId: string;
		this._userService.currentUser$
			.pipe(
				tap((user) => (userId = user?.id ?? '')),
				switchMap(() => from(this._editor.save())),
				switchMap((outputData) => {
					console.log(JSON.stringify(outputData, null, 2));
					const newsContent = JSON.stringify(outputData.blocks);
					const previewBlocks = outputData.blocks.filter((block) => block.tunes?.previewTune.preview);
					const previewContent = JSON.stringify(
						previewBlocks.length > 0
							? previewBlocks
							: outputData.blocks.find((block) => block.type === 'paragraph')
					);
					const news: CreateNewsRequest = {
						authorId: userId,
						subject: this.articleHeading.value.trim(),
						preview: previewContent,
						content: newsContent,
					};
					return this._newsService.createNews(news);
				})
			)
			.subscribe();
	}

	private _detectEditorChanges(): Observable<any> {
		return new Observable((observer) => {
			const editorDom = document.querySelector('#editorjs') as Element;
			const config = { attributes: true, childList: true, subtree: true };

			this._editorObserver = new MutationObserver((mutation) => {
				observer.next(mutation);
			});

			this._editorObserver.observe(editorDom, config);
		});
	}
}
