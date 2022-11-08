import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorOptions } from './types';

@Component({
	selector: 'do-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
	private readonly defaultOptions: EditorOptions = {
		promotion: false,
		statusbar: false,
		menubar: false,
		skin_url: '/assets/tinymce-skin',
	};
	@Input()
	set editorOptions(options: EditorOptions) {
		this._editorOptions = { ...this.defaultOptions, ...options };
	}
	get editorOptions(): EditorOptions {
		return this._editorOptions;
	}
	private _editorOptions = this.defaultOptions;

	public editorContent = new FormControl('', { nonNullable: true });

	constructor() {}
}
