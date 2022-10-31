import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'do-article-body',
	templateUrl: './article-body.component.html',
	styleUrls: ['./article-body.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBodyComponent {
	constructor() {}
}
