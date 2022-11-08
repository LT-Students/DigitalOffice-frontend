import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'do-article-editor',
	templateUrl: './article-editor.component.html',
	styleUrls: ['./article-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent {
	constructor() {}
}
