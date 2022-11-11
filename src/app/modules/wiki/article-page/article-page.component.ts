import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiStateService } from '../services';

@Component({
	selector: 'do-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent {
	public tree$ = this.wikiTree.tree$;
	public articleId = this.route.snapshot.params['id'];

	constructor(private wikiTree: WikiStateService, private route: ActivatedRoute) {}

	public handleArticleChange(articleId: string): void {
		this.articleId = articleId;
	}
}
