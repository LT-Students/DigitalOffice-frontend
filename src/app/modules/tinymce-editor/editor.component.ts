import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EditorOptions } from './types';

@Component({
	selector: 'do-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
	private readonly defaultOptions: EditorOptions = { promotion: false, statusbar: false };
	@Input()
	set editorOptions(options: EditorOptions) {
		this._editorOptions = { ...this.defaultOptions, ...options };
	}
	get editorOptions(): EditorOptions {
		return this._editorOptions;
	}
	private _editorOptions = this.defaultOptions;

	constructor() {}
}
