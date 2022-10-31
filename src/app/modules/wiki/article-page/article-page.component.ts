import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WikiTreeService } from '../services/wiki-tree.service';

@Component({
	selector: 'do-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent {
	public tree$ = this.wikiTree.getWikiTree();

	constructor(private wikiTree: WikiTreeService) {}
}
