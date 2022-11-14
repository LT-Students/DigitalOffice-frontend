import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleResponse } from '@api/wiki-service/models/article-response';

@Component({
	selector: 'do-article-viewer',
	templateUrl: './article-viewer.component.html',
	styleUrls: ['./article-viewer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleViewerComponent {
	@Input() article!: ArticleResponse;

	constructor() {}
}
