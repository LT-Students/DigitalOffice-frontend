//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { debounceTime, skip, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { NewsEditorConfig } from './news-editor.config';

@Component({
	selector: 'do-news-editor',
	templateUrl: './news-editor.component.html',
	styleUrls: ['./news-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsEditorComponent implements OnInit, OnDestroy {
	editorData: any;
	editor: EditorJS;
	//remove undefined?
	editorObserver?: MutationObserver;
	private _destroy$: ReplaySubject<void>;

	constructor(private _editorConfig: NewsEditorConfig) {
		this.editor = new EditorJS(this._editorConfig.editorConfig);
		this._destroy$ = new ReplaySubject<void>(1);
	}

	ngOnInit(): void {
		this.detectEditorChanges()
			.pipe(debounceTime(200), skip(1), takeUntil(this._destroy$))
			.subscribe((data) => {
				this.editor.save().then((outputData) => {
					this.editorData = JSON.stringify(outputData, null, 2);
				});
			});
	}

	saveEditorData(): void {
		this.editor.save().then((outputData) => {
			this.editorData = JSON.stringify(outputData, null, 2);
		});
	}

	ngOnDestroy(): void {
		this.editorObserver.disconnect();
		this._destroy$.next();
		this._destroy$.complete();
	}

	detectEditorChanges(): Observable<any> {
		return new Observable((observer) => {
			const editorDom = document.querySelector('#editorjs');
			const config = { attributes: true, childList: true, subtree: true };

			this.editorObserver = new MutationObserver((mutation) => {
				observer.next(mutation);
			});

			this.editorObserver.observe(editorDom, config);
		});
	}
}
