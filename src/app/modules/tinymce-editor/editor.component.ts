import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'do-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
	public editorOptions = {};

	constructor() {}
}
