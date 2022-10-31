import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-article-actions',
	templateUrl: './article-actions.component.html',
	styleUrls: ['./article-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleActionsComponent {
	public readonly Icons = Icons;

	constructor() {}
}
