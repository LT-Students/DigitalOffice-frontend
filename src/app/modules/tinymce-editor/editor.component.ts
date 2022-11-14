import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Optional, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorOptions } from './types';

@Component({
	selector: 'do-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnDestroy, ControlValueAccessor {
	private readonly defaultOptions: EditorOptions = {
		promotion: false,
		statusbar: false,
		menubar: false,
		skin_url: '/assets/tinymce-skin',
	};

	@Output() onDirty = new EventEmitter<void>();

	@Input()
	set editorOptions(options: EditorOptions) {
		this._editorOptions = { ...this.defaultOptions, ...options };
	}
	get editorOptions(): EditorOptions {
		return this._editorOptions;
	}
	private _editorOptions = this.defaultOptions;

	public editorContent = new FormControl('', { nonNullable: true });

	private destroy$ = new Subject();

	constructor(@Optional() ngControl: NgControl) {
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public writeValue(content: string): void {
		this.editorContent.setValue(content, { emitEvent: false });
	}

	public registerOnChange(fn: any): void {
		this.editorContent.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
	}

	public registerOnTouched(fn: any): void {}
}
