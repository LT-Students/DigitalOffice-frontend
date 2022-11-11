import { ChangeDetectionStrategy, Component, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NgControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WIKI_EDITOR_OPTIONS } from './editor-options';

@Component({
	selector: 'do-article-editor',
	templateUrl: './article-editor.component.html',
	styleUrls: ['./article-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent implements OnDestroy, ControlValueAccessor {
	public readonly TITLE_MAX_LENGTH = 210;
	public readonly editorOptions = WIKI_EDITOR_OPTIONS;

	public articleForm = this.fb.nonNullable.group({
		title: ['', [Validators.maxLength(this.TITLE_MAX_LENGTH)]],
		content: [''],
	});

	private subscription?: Subscription;

	constructor(@Optional() @Self() ngControl: NgControl, private fb: FormBuilder) {
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	public registerOnChange(fn: any): void {
		this.subscription = this.articleForm.valueChanges.subscribe(fn);
	}

	public registerOnTouched(fn: any): void {}

	public writeValue({ title, content }: { title: string; content: string }): void {
		this.articleForm.setValue({ title, content }, { emitEvent: false });
	}
}
